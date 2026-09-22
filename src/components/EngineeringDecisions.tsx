import { useState } from 'react'
import { decisionGroups } from '../data/decisions.ts'
import { Section } from './Section.tsx'
import { cx } from '../lib/cx.ts'

export function EngineeringDecisions() {
  const [openId, setOpenId] = useState<string | null>(decisionGroups[0]?.decisions[0]?.id ?? null)

  return (
    <Section
      id="decisions"
      index="04"
      title="Engineering Decisions"
      intro="Why I built it this way. These cards are technical rationales grounded in the documented project stacks. They are not a private decision diary of rejected alternatives."
      band
    >
      <div className="decision-groups">
        {decisionGroups.map((group) => (
          <article key={group.projectId} className="decision-group">
            <header>
              <p className="kicker">Project</p>
              <h3>{group.projectName}</h3>
            </header>
            <ul className="decision-list">
              {group.decisions.map((decision, index) => {
                const open = openId === decision.id
                const panelId = `${decision.id}-panel`
                return (
                  <li key={decision.id}>
                    <button
                      type="button"
                      className={cx('decision-trigger', open && 'is-open')}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : decision.id)}
                    >
                      <span>
                        Decision #{String(index + 1).padStart(2, '0')}
                      </span>
                      {decision.title}
                    </button>
                    {open ? (
                      <div id={panelId} className="decision-panel">
                        <p className="demo-label">Technical rationale</p>
                        <h4>{decision.title}</h4>
                        <p>
                          <strong>Problem</strong>
                          <span>{decision.problem}</span>
                        </p>
                        <p>
                          <strong>Portfolio context</strong>
                          <span>{decision.context}</span>
                        </p>
                        <p>
                          <strong>Selected</strong>
                          <span>{decision.selected}</span>
                        </p>
                        <p>
                          <strong>Reason</strong>
                          <span>{decision.reason}</span>
                        </p>
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
