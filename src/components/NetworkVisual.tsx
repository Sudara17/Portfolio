import { useEffect, useRef } from 'react'

type NodePoint = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hub: boolean
}

function createNodes(count: number): NodePoint[] {
  return Array.from({ length: count }, (_, index) => ({
    x: 0.08 + Math.random() * 0.84,
    y: 0.08 + Math.random() * 0.84,
    vx: (Math.random() - 0.5) * 0.0005,
    vy: (Math.random() - 0.5) * 0.0005,
    r: index % 7 === 0 ? 2.7 : 1.4,
    hub: index % 7 === 0,
  }))
}

export function NetworkVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = window.matchMedia('(max-width: 700px)').matches ? 26 : 44
    const nodes = createNodes(count)
    const pointer = { x: 0.5, y: 0.5, active: false }
    let frame = 0
    let visible = true
    let stopped = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const colors = () => {
      const styles = getComputedStyle(document.documentElement)
      return {
        node: styles.getPropertyValue('--viz-node').trim() || '#3ee0c5',
        link: styles.getPropertyValue('--viz-link').trim() || 'rgba(62, 224, 197, 0.35)',
        hub: styles.getPropertyValue('--viz-hub').trim() || '#9ebcff',
      }
    }

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (pointer.active) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const distance = Math.hypot(dx, dy)
          if (distance < 0.22 && distance > 0.001) {
            node.vx += (dx / distance) * 0.00009
            node.vy += (dy / distance) * 0.00009
          }
        }
        const speed = Math.hypot(node.vx, node.vy)
        const maxSpeed = 0.0016
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed
          node.vy = (node.vy / speed) * maxSpeed
        } else if (speed < 0.00012) {
          node.vx += (Math.random() - 0.5) * 0.0002
          node.vy += (Math.random() - 0.5) * 0.0002
        }
        if (node.x < 0.04 || node.x > 0.96) node.vx *= -1
        if (node.y < 0.04 || node.y > 0.96) node.vy *= -1
        node.x = Math.min(0.96, Math.max(0.04, node.x))
        node.y = Math.min(0.96, Math.max(0.04, node.y))
      }
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const palette = colors()
      context.clearRect(0, 0, width, height)
      const reach = Math.min(width, height) * 0.34
      context.lineWidth = 1
      for (let i = 0; i < nodes.length; i += 1) {
        const start = nodes[i]
        if (!start) continue
        for (let j = i + 1; j < nodes.length; j += 1) {
          const end = nodes[j]
          if (!end) continue
          const ax = start.x * width
          const ay = start.y * height
          const bx = end.x * width
          const by = end.y * height
          const distance = Math.hypot(ax - bx, ay - by)
          if (distance > reach) continue
          context.globalAlpha = (1 - distance / reach) * 0.9
          context.strokeStyle = palette.link
          context.beginPath()
          context.moveTo(ax, ay)
          context.lineTo(bx, by)
          context.stroke()
        }
      }
      context.globalAlpha = 1
      for (const node of nodes) {
        const x = node.x * width
        const y = node.y * height
        context.fillStyle = node.hub ? palette.hub : palette.node
        context.beginPath()
        context.arc(x, y, node.r, 0, Math.PI * 2)
        context.fill()
        if (node.hub) {
          context.globalAlpha = 0.4
          context.strokeStyle = palette.hub
          context.beginPath()
          context.arc(x, y, node.r + 4, 0, Math.PI * 2)
          context.stroke()
          context.globalAlpha = 1
        }
      }
    }

    const tick = () => {
      if (!reduce) step()
      draw()
      if (!stopped && visible && !document.hidden && !reduce) {
        frame = requestAnimationFrame(tick)
      }
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (!stopped) frame = requestAnimationFrame(tick)
    }

    resize()
    if (reduce) draw()
    else start()

    const onResize = () => {
      resize()
      if (reduce) draw()
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }
    const onVisibility = () => {
      if (!document.hidden && visible && !reduce) start()
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible && !reduce) start()
    })
    intersection.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)
    const themeObserver = new MutationObserver(() => {
      if (reduce) draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="visual-frame">
      <div className="visual-bar" aria-hidden="true">
        <span>Network</span>
        <span className="visual-live">
          <span className="dot" /> Pointer reactive
        </span>
      </div>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Decorative network linking AI, RAG, LLM, APIs, Flutter, React, and testing. With a mouse, moving the pointer gently attracts nearby nodes."
      />
      <ul className="viz-concepts" aria-label="Technical themes">
        {['AI', 'RAG', 'LLM', 'APIs', 'Flutter', 'React', 'Testing'].map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  )
}
