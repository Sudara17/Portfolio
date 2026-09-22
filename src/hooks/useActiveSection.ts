import { useEffect, useState } from 'react'
import { sectionIds } from '../data/navigation.ts'

export function useActiveSection() {
  const [active, setActive] = useState<string>(sectionIds[0] ?? 'home')

  useEffect(() => {
    let frame = 0

    const update = () => {
      const ids = sectionIds
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        const last = ids[ids.length - 1] ?? 'contact'
        setActive((current) => (current === last ? current : last))
        return
      }

      const marker = window.scrollY + 120
      let next = ids[0] ?? 'home'
      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= marker) next = id
      }
      setActive((current) => (current === next ? current : next))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}
