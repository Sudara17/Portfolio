import { Braces, Brain, GraduationCap, Layers, ListChecks, Network, Smartphone } from 'lucide-react'
import type { FocusIcon } from '../data/about.ts'
import { focusAreas } from '../data/about.ts'
import { profile } from '../data/profile.ts'
import { Section } from './Section.tsx'

const icons = {
  brain: Brain,
  layers: Layers,
  smartphone: Smartphone,
  braces: Braces,
  checks: ListChecks,
  network: Network,
} satisfies Record<FocusIcon, typeof Brain>

export function About() {
  return (
    <Section id="about" index="01" title="About Me">
      <div className="about-layout">
        <div className="about-copy">
          {profile.summary.map((paragraph) => (
            <p key={paragraph} className="summary">
              {paragraph}
            </p>
          ))}
          <article className="edu-card">
            <span className="focus-icon" aria-hidden="true">
              <GraduationCap size={18} strokeWidth={1.75} />
            </span>
            <p className="kicker">Education</p>
            <h3>{profile.education.degree}</h3>
            <p>{profile.education.school}</p>
            <p className="period">{profile.education.period}</p>
          </article>
        </div>
        <div>
          <h3 className="subhead">What I work with</h3>
          <ul className="focus-grid">
            {focusAreas.map((area) => {
              const Icon = icons[area.icon]
              return (
                <li key={area.title} className="focus-card">
                  <span className="focus-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
