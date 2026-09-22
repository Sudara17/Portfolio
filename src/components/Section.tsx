import type { ReactNode } from 'react'
import { moduleLabels } from '../data/navigation.ts'
import { useInView } from '../hooks/useInView.ts'
import { cx } from '../lib/cx.ts'

type Props = {
  id: string
  index: string
  title: string
  intro?: string
  band?: boolean
  children: ReactNode
}

export function Section({ id, index, title, intro, band = false, children }: Props) {
  const { ref, inView } = useInView<HTMLElement>()
  const moduleLabel = moduleLabels[id]

  return (
    <section
      id={id}
      ref={ref}
      className={cx('section', band && 'section-band', 'reveal', inView && 'is-in')}
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <header className="section-head">
          <span className="index" aria-hidden="true">
            {index}
          </span>
          <div>
            {moduleLabel ? <p className="module-label">{moduleLabel}</p> : null}
            <h2 id={`${id}-title`}>{title}</h2>
            {intro ? <p className="section-intro">{intro}</p> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
