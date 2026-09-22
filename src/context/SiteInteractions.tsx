import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { assistantPrompts } from '../data/portfolio.ts'
import type { SystemId } from '../data/os.ts'

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
  systemFocus: SystemId | null
  setSystemFocus: (id: SystemId | null) => void
}

const defaultLaunch: ChatLaunch = { prompts: assistantPrompts }

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  const [launch, setLaunch] = useState<ChatLaunch>(defaultLaunch)
  const [systemFocus, setSystemFocus] = useState<SystemId | null>(null)

  const value = useMemo<SiteContextValue>(
    () => ({
      chatOpen,
      launch,
      systemFocus,
      setSystemFocus,
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
    [chatOpen, launch, systemFocus],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used inside SiteProvider')
  return value
}
