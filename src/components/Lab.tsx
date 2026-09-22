import { useState } from 'react'
import { bugChallenges, challenges } from '../data/lab.ts'
import { Section } from './Section.tsx'
import { cx } from '../lib/cx.ts'

export function Lab() {
  return (
    <Section
      id="lab"
      index="09"
      title="Lab"
      intro="Interactive challenges for debugging and technical judgment. These are portfolio demos, not claims that the exact bugs happened on a production timeline."
      band
    >
      <div className="lab-stack">
        <BugLab />
        <ChallengeSudara />
      </div>
    </Section>
  )
}

function BugLab() {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  return (
    <div className="lab-block">
      <p className="demo-label">Bug Lab</p>
      <h3>Debug a small problem</h3>
      <p className="demo-note">Portfolio interactive challenge. Topics mirror GST, APIs, RAG, SQL, and Playwright from the portfolio stack.</p>
      <div className="bug-grid">
        {bugChallenges.map((bug) => {
          const selected = answers[bug.id]
          const correct = selected === bug.answer
          return (
            <article key={bug.id} className="bug-card">
              <h4>{bug.title}</h4>
              <p>{bug.prompt}</p>
              {bug.code ? <pre className="bug-code">{bug.code}</pre> : null}
              <div className="bug-options">
                {bug.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={cx(
                      selected === option.id && 'is-selected',
                      selected && option.id === bug.answer && 'is-correct',
                      selected === option.id && option.id !== bug.answer && 'is-wrong',
                    )}
                    onClick={() => setAnswers((current) => ({ ...current, [bug.id]: option.id }))}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {selected ? (
                <div className="bug-reveal" role="status">
                  <p>
                    <strong>{correct ? 'Correct' : 'Not quite'}</strong>
                  </p>
                  <p>
                    <strong>Why?</strong> {bug.why}
                  </p>
                  {bug.fix ? <pre className="bug-code">{bug.fix}</pre> : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function ChallengeSudara() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const challenge = challenges[index]
  if (!challenge) return null
  const correct = selected === challenge.answer

  function next() {
    setSelected(null)
    setIndex((value) => (value + 1) % challenges.length)
  }

  return (
    <div className="lab-block">
      <p className="demo-label">Challenge Sudara</p>
      <h3>Technical scenarios</h3>
      <p className="demo-note">
        Educational interactive feature. These scenarios are not claimed as production incidents unless separately documented.
      </p>
      <article className="challenge-card">
        <p className="kicker">
          {challenge.title} · {index + 1}/{challenges.length}
        </p>
        <h4>{challenge.scenario}</h4>
        <div className="bug-options">
          {challenge.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cx(
                selected === option.id && 'is-selected',
                selected && option.id === challenge.answer && 'is-correct',
                selected === option.id && option.id !== challenge.answer && 'is-wrong',
              )}
              onClick={() => setSelected(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selected ? (
          <div className="bug-reveal" role="status">
            <p>
              <strong>{correct ? 'Solid direction' : 'Another angle'}</strong>
            </p>
            <p>
              <strong>Here&apos;s how I would approach this:</strong> {challenge.approach}
            </p>
            <button type="button" className="btn btn-secondary" onClick={next}>
              Next challenge
            </button>
          </div>
        ) : null}
      </article>
    </div>
  )
}
