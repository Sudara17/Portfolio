import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useSite } from '../context/SiteInteractions.tsx'
import { assistantOpening, assistantUnavailable } from '../data/portfolio.ts'

const SECTIONS = new Set(['about', 'experience', 'projects', 'skills', 'achievements', 'contact'])
const MAX_MESSAGE = 1000

type Source = {
  section: string
  label: string
}

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
  source?: Source
}

const OPENING: ChatMessage = {
  id: 'opening',
  role: 'assistant',
  content: assistantOpening,
}

function readSource(value: unknown): Source | undefined {
  if (!value || typeof value !== 'object') return undefined
  const section = 'section' in value ? value.section : undefined
  const label = 'label' in value ? value.label : undefined
  if (typeof section !== 'string' || !SECTIONS.has(section)) return undefined
  if (typeof label !== 'string' || !label.trim()) return undefined
  return { section, label: label.trim().slice(0, 80) }
}

export function AskSudara() {
  const { chatOpen, launch, openChat, closeChat } = useSite()
  const titleId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([OPENING])

  useEffect(() => {
    if (!chatOpen) return
    inputRef.current?.focus()
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeChat()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [chatOpen, closeChat])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    list.scrollTop = list.scrollHeight
  }, [messages, pending, chatOpen])

  function goToSource(section: string) {
    closeChat()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(section)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  async function send(text: string) {
    const message = text.trim()
    if (!message || pending) return
    if (message.length > MAX_MESSAGE) return

    const history = messages
      .filter((item) => item.id !== 'opening')
      .slice(-10)
      .map((item) => ({ role: item.role, content: item.content }))

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content: message }
    setMessages((current) => [...current, userMessage])
    setDraft('')
    setPending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversation: history,
          ...(launch.projectId ? { projectId: launch.projectId } : {}),
        }),
      })
      const payload: unknown = await response.json().catch(() => null)
      const reply =
        payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string'
          ? payload.message
          : assistantUnavailable
      const source =
        response.ok && payload && typeof payload === 'object' && 'source' in payload
          ? readSource(payload.source)
          : undefined
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: reply, source },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: assistantUnavailable },
      ])
    } finally {
      setPending(false)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send(draft)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void send(draft)
    }
  }

  const showSuggestions = Boolean(launch.projectId) || messages.every((item) => item.id === 'opening')

  return (
    <div className="ask-sudara">
      {chatOpen ? (
        <section className="ask-panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <header className="ask-head">
            <div>
              <p className="kicker">
                <span className="ai-status" aria-hidden="true" />
                Portfolio AI
              </p>
              <h2 id={titleId}>Sudara AI</h2>
              {launch.projectName ? <p className="ask-context">Ask This Project · {launch.projectName}</p> : null}
            </div>
            <button type="button" className="icon-btn" onClick={closeChat} aria-label="Close Sudara AI">
              <X aria-hidden="true" />
            </button>
          </header>
          <div className="ask-log" ref={listRef} aria-live="polite">
            {messages.map((item) => (
              <article key={item.id} className={`ask-bubble ask-${item.role}`}>
                <p>{item.content}</p>
                {item.source ? (
                  <button type="button" className="ask-source" onClick={() => goToSource(item.source?.section ?? 'about')}>
                    <span>Source</span>
                    {item.source.label}
                  </button>
                ) : null}
              </article>
            ))}
            {pending ? (
              <p className="ask-pending" role="status">
                <span className="typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                Sudara AI is thinking...
              </p>
            ) : null}
          </div>
          {showSuggestions ? (
            <div className="ask-suggestions">
              {launch.prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => void send(prompt)} disabled={pending}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}
          <form className="ask-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="ask-input">
              Ask Sudara AI
            </label>
            <textarea
              id="ask-input"
              ref={inputRef}
              rows={2}
              maxLength={MAX_MESSAGE}
              value={draft}
              placeholder={launch.projectName ? `Ask about ${launch.projectName}` : 'Ask about projects, experience, or skills'}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              disabled={pending}
            />
            <button type="submit" className="btn btn-primary" disabled={pending || !draft.trim()}>
              <Send aria-hidden="true" />
              Send
            </button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="ask-launcher"
        aria-expanded={chatOpen}
        onClick={() => (chatOpen ? closeChat() : openChat())}
      >
        <MessageCircle aria-hidden="true" />
        Ask Sudara AI
      </button>
    </div>
  )
}
