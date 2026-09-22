import { lazy, Suspense, useState } from 'react'
import { Check } from 'lucide-react'
import type { Project } from '../data/projects.ts'
import { useSite } from '../context/SiteInteractions.tsx'
import { cx } from '../lib/cx.ts'
import { ArchitectureFlow } from './ArchitectureFlow.tsx'

const InvoicePlayground = lazy(() =>
  import('./InvoicePlayground.tsx').then((module) => ({ default: module.InvoicePlayground })),
)
const ResumeMatcher = lazy(() =>
  import('./ResumeMatcher.tsx').then((module) => ({ default: module.ResumeMatcher })),
)

type Panel = 'explore' | 'architecture' | 'evidence' | 'demo'

type Props = {
  project: Project
  number: number
}

export function ProjectCard({ project, number }: Props) {
  const { openChat } = useSite()
  const [panel, setPanel] = useState<Panel | null>(null)
  const panelId = `${project.id}-panel`

  function toggle(next: Panel) {
    setPanel((current) => (current === next ? null : next))
  }

  function askProject() {
    openChat({
      projectId: project.id,
      projectName: project.name,
      prompts: project.askPrompts,
    })
  }

  return (
    <article className={cx('project-card', panel && 'is-open')}>
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
      <div className="project-actions">
        <button type="button" className={cx('btn btn-ghost', panel === 'explore' && 'is-selected')} aria-expanded={panel === 'explore'} aria-controls={panelId} onClick={() => toggle('explore')}>
          Explore
        </button>
        <button type="button" className={cx('btn btn-ghost', panel === 'architecture' && 'is-selected')} aria-expanded={panel === 'architecture'} aria-controls={panelId} onClick={() => toggle('architecture')}>
          View Architecture
        </button>
        <button type="button" className={cx('btn btn-ghost', panel === 'evidence' && 'is-selected')} aria-expanded={panel === 'evidence'} aria-controls={panelId} onClick={() => toggle('evidence')}>
          View Evidence
        </button>
        {project.demo ? (
          <button type="button" className={cx('btn btn-ghost', panel === 'demo' && 'is-selected')} aria-expanded={panel === 'demo'} aria-controls={panelId} onClick={() => toggle('demo')}>
            {project.demo === 'invoice' ? 'Try Interactive Demo' : 'Try the Resume Matcher'}
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost" onClick={askProject}>
          Ask This Project
        </button>
        {project.links?.map((link) => (
          <a key={link.href} className="btn btn-secondary" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
      {panel ? (
        <div id={panelId} className="project-details">
          {panel === 'explore' ? (
            <>
              <h4>Problem</h4>
              <p>{project.problem}</p>
              <h4>What I built</h4>
              <ul className="feature-list">
                {project.built.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h4>Result</h4>
              <p>{project.result}</p>
            </>
          ) : null}
          {panel === 'architecture' ? (
            <>
              <h4>How I Built It</h4>
              <ArchitectureFlow nodes={project.architecture} />
            </>
          ) : null}
          {panel === 'evidence' ? (
            <>
              <h4>What I Built</h4>
              <ul className="feature-list">
                {project.built.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h4>Technologies</h4>
              <ul className="badges">
                {project.technologies.map((technology) => (
                  <li key={technology} className="badge">
                    {technology}
                  </li>
                ))}
              </ul>
              <h4>Technical Context</h4>
              <p>{project.technicalContext}</p>
              <h4>Relevant Experience</h4>
              <p>{project.relatedExperience}</p>
              <h4>Architecture</h4>
              <p>{project.architecture.map((node) => node.label).join(' → ')}</p>
              <h4>Live Demo</h4>
              {project.links && project.links.length > 0 ? (
                project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))
              ) : (
                <p>No live demo.</p>
              )}
              <button type="button" className="btn btn-ghost" onClick={askProject}>
                Ask This Project
              </button>
            </>
          ) : null}
          {panel === 'demo' ? (
            <Suspense fallback={<p className="demo-note">Loading demo…</p>}>
              {project.demo === 'invoice' ? <InvoicePlayground /> : null}
              {project.demo === 'matcher' ? <ResumeMatcher /> : null}
            </Suspense>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
