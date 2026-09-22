import { useState } from 'react'
import type { ArchitectureNode } from '../data/projects.ts'
import { cx } from '../lib/cx.ts'

export function ArchitectureFlow({ nodes }: { nodes: ArchitectureNode[] }) {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? '')
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0]

  return (
    <div className="arch">
      <ol className="arch-flow">
        {nodes.map((node, index) => (
          <li key={node.id}>
            {index > 0 ? (
              <span className="arch-arrow" aria-hidden="true">
                ↓
              </span>
            ) : null}
            <button
              type="button"
              className={cx('arch-node', node.id === active?.id && 'is-active')}
              aria-pressed={node.id === active?.id}
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
            >
              {node.label}
            </button>
          </li>
        ))}
      </ol>
      {active ? (
        <p className="arch-detail" role="status">
          <span>{active.label}</span>
          {active.detail}
        </p>
      ) : null}
    </div>
  )
}
