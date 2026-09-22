import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (barRef.current) barRef.current.style.width = `${value * 100}%`
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

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  )
}
