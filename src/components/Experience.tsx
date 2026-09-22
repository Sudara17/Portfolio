import { useState } from 'react'
import { experience } from '../data/experience.ts'
import { Section } from './Section.tsx'

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <Section id="experience" index="02" title="Experience" band>
      <ol className="timeline">
        {experience.map((item) => {
          const open = openId === item.id
          const panelId = `${item.id}-work`
          return (
            <li key={item.id}>
              <article className="job">
                <div className="job-top">
                  <div>
                    <h3>{item.company}</h3>
                    <p className="role">{item.role}</p>
                  </div>
                  <p className="period">{item.period}</p>
                </div>
                <p className="job-lead">{item.highlights[0]}</p>
                <button
                  type="button"
                  className="btn btn-ghost details-toggle"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  {open ? 'Hide' : 'Inspect'}
                </button>
                {open ? (
                  <div id={panelId} className="job-more">
                    <ul className="highlights">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    {item.workedOn ? (
                      <>
                        <h4>What I worked on</h4>
                        <ul className="badges" aria-label="What I worked on">
                          {item.workedOn.map((topic) => (
                            <li key={topic} className="badge">
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
