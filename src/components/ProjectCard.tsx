import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { Project } from '../data/projects.ts'
import { cx } from '../lib/cx.ts'

type Props = {
  project: Project
  number: number
}

export function ProjectCard({ project, number }: Props) {
  const [open, setOpen] = useState(false)
  const detailsId = `${project.id}-details`

  return (
    <article className={cx('project-card', open && 'is-open')}>
      <p className="project-kicker">
        <span>{String(number).padStart(2, '0')}</span>
        <span>{project.category}</span>
      </p>
      <h3>{project.name}</h3>
      <p className="project-copy">{project.description}</p>
      {project.metric ? (
        <p className="metric">
          <strong>{project.metric.value}</strong>
          <span>{project.metric.detail}</span>
        </p>
      ) : null}
      <ul className="badges" aria-label="Technologies">
        {project.technologies.map((technology) => (
          <li key={technology} className="badge">
            {technology}
          </li>
        ))}
      </ul>
      {project.links && project.links.length > 0 ? (
        <ul className="project-links">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        className="btn btn-ghost details-toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide details' : 'View details'}
        <ChevronDown className={open ? 'chevron open' : 'chevron'} aria-hidden="true" />
      </button>
      {open ? (
        <div id={detailsId} className="project-details">
          <h4>Key features</h4>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {project.technicalComponents ? (
            <>
              <h4>Technical components</h4>
              <ul className="badges" aria-label="Technical components">
                {project.technicalComponents.map((component) => (
                  <li key={component} className="badge">
                    {component}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
