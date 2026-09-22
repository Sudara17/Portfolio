import { experience } from '../data/experience.ts'
import { Section } from './Section.tsx'

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience" band>
      <ol className="timeline">
        {experience.map((item) => (
          <li key={item.id}>
            <article className="job">
              <div className="job-top">
                <div>
                  <h3>{item.company}</h3>
                  <p className="role">{item.role}</p>
                </div>
                <p className="period">{item.period}</p>
              </div>
              <ul className="highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {item.technologies ? (
                <ul className="badges" aria-label="Technologies">
                  {item.technologies.map((technology) => (
                    <li key={technology} className="badge">
                      {technology}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
