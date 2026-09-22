import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(prefersReducedMotion)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    const timeout = window.setTimeout(() => setInView(true), 1800)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [])

  return { ref, inView }
}
