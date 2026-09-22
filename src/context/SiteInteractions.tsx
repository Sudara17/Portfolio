import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { assistantPrompts } from '../data/portfolio.ts'

export type Audience = 'recruiter' | 'developer' | 'aiml'

export type ChatLaunch = {
  projectId?: string
  projectName?: string
  prompts: readonly string[]
}

type SiteContextValue = {
  audience: Audience
  setAudience: (audience: Audience) => void
  chatOpen: boolean
  launch: ChatLaunch
  openChat: (next?: Partial<ChatLaunch>) => void
  closeChat: () => void
}

const defaultLaunch: ChatLaunch = { prompts: assistantPrompts }

const SiteContext = createContext<SiteContextValue | null>(null)

const focusIds: Record<Audience, readonly string[]> = {
  recruiter: ['experience', 'projects', 'achievements', 'contact'],
  developer: ['projects', 'skills'],
  aiml: ['projects', 'skills', 'achievements'],
}

export function sectionIsFocused(id: string, audience: Audience) {
  return focusIds[audience].includes(id)
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('recruiter')
  const [chatOpen, setChatOpen] = useState(false)
  const [launch, setLaunch] = useState<ChatLaunch>(defaultLaunch)

  useEffect(() => {
    document.documentElement.dataset.audience = audience
  }, [audience])

  const value = useMemo<SiteContextValue>(
    () => ({
      audience,
      setAudience,
      chatOpen,
      launch,
      openChat(next) {
        setLaunch({
          projectId: next?.projectId,
          projectName: next?.projectName,
          prompts: next?.prompts?.length ? next.prompts : assistantPrompts,
        })
        setChatOpen(true)
      },
      closeChat() {
        setChatOpen(false)
      },
    }),
    [audience, chatOpen, launch],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used inside SiteProvider')
  return value
}
