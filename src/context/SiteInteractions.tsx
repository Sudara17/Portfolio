import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { assistantPrompts } from '../data/portfolio.ts'

export type ChatLaunch = {
  projectId?: string
  projectName?: string
  prompts: readonly string[]
}

type SiteContextValue = {
  chatOpen: boolean
  launch: ChatLaunch
  openChat: (next?: Partial<ChatLaunch>) => void
  closeChat: () => void
}

const defaultLaunch: ChatLaunch = { prompts: assistantPrompts }

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  const [launch, setLaunch] = useState<ChatLaunch>(defaultLaunch)

  const value = useMemo<SiteContextValue>(
    () => ({
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
    [chatOpen, launch],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used inside SiteProvider')
  return value
}
