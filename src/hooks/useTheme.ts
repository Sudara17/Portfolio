import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const listeners = new Set<(theme: Theme) => void>()

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be blocked; the in-page theme still updates.
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f6f8' : '#08090d')
  listeners.forEach((listener) => listener(theme))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const listener = (next: Theme) => setTheme(next)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const toggleTheme = () => applyTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme }
}
