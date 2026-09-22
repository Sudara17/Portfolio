import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navItems } from '../data/navigation.ts'
import { profile } from '../data/profile.ts'
import { RESUME_URL } from '../lib/resume.ts'
import { useActiveSection } from '../hooks/useActiveSection.ts'
import { useTheme } from '../hooks/useTheme.ts'
import { cx } from '../lib/cx.ts'

export function Navbar() {
  const active = useActiveSection()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const scrolledRef = { current: false }
    const update = () => {
      const next = window.scrollY > 8
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 961px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const getFocusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])

    getFocusable()[0]?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = getFocusable()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={cx('nav', scrolled && 'scrolled', open && 'menu-open')}>
      <div className="container nav-inner">
        <a className="brand" href="#home" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-text">
            <span className="brand-name">{profile.shortName}</span>
            <span className="brand-role">OS · {profile.identity}</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site sections"
        >
          <button type="button" className="mobile-close" onClick={close}>
            Close menu
          </button>
          <nav aria-label="Mobile">
            <a className="mobile-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer" onClick={close}>
              <span>Resume</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mobile-link"
                aria-current={active === item.id ? 'true' : undefined}
                onClick={close}
              >
                <span>{item.label}</span>
                <span className="mobile-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
