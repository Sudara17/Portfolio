import { achievements } from '../data/achievements.ts'
import { Section } from './Section.tsx'

export function Achievements() {
  const featured = achievements.find((item) => item.featured)
  const rest = achievements.filter((item) => !item.featured)

  return (
    <Section id="achievements" index="06" title="Achievements">
      {featured ? (
        <article className="award-feature">
          <div className="award-mark">
            <p className="award-rank">{featured.rank}</p>
            <p className="award-rank-label">{featured.rankLabel}</p>
            <p className="award-event">{featured.event}</p>
          </div>
          <div>
            <p className="kicker">{featured.kicker}</p>
            <h3>{featured.title}</h3>
            <p>{featured.detail}</p>
          </div>
        </article>
      ) : null}
      <div className="award-grid">
        {rest.map((item) => (
          <article key={item.id} className="award-card">
            <p className="kicker">{item.year}</p>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
