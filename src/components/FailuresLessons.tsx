import { lessons } from '../data/lab.ts'
import { Section } from './Section.tsx'

export function FailuresLessons() {
  return (
    <Section
      id="lessons"
      index="08"
      title="Failures & Lessons"
      intro="Things that make these systems hard. The portfolio does not publish a private incident log, so each card is a technical note derived from documented stacks and workflows."
    >
      <div className="lesson-grid">
        {lessons.map((lesson, index) => (
          <article key={lesson.id} className="lesson-card">
            <p className="demo-label">
              Technical note · {String(index + 1).padStart(2, '0')}
            </p>
            <h3>{lesson.title}</h3>
            <p>
              <strong>Problem</strong>
              <span>{lesson.problem}</span>
            </p>
            <p>
              <strong>What happened</strong>
              <span>{lesson.happened}</span>
            </p>
            <p>
              <strong>What I learned</strong>
              <span>{lesson.learned}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
