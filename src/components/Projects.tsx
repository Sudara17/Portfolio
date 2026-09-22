import { useState } from 'react'
import { projectFilters, projects, type ProjectFilter } from '../data/projects.ts'
import { useSite } from '../context/SiteInteractions.tsx'
import { onTabListKeyDown } from '../lib/tabs.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { Section } from './Section.tsx'

const aiFirst = ['ai-resume-assistant', 'emotion-aware-assistant', 'invoice-management', 'leave-management']

function filterId(filter: ProjectFilter) {
  return `project-filter-${filter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export function Projects() {
  const { audience } = useSite()
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const ordered =
    audience === 'aiml'
      ? [...projects].sort((a, b) => aiFirst.indexOf(a.id) - aiFirst.indexOf(b.id))
      : projects
  const visible = ordered
    .map((project, index) => ({ project, number: index + 1 }))
    .filter((item) => filter === 'All' || item.project.category === filter)
  const tabIds = projectFilters.map((item) => filterId(item))

  return (
    <Section id="projects" index="03" title="Projects">
      <div className="toolbar">
        <div className="segment" role="tablist" aria-label="Project categories">
          {projectFilters.map((item, index) => {
            const selected = filter === item
            return (
              <button
                key={item}
                id={filterId(item)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setFilter(item)}
                onKeyDown={(event) =>
                  onTabListKeyDown(event, index, tabIds, (next) => {
                    const value = projectFilters[next]
                    if (value) setFilter(value)
                  })
                }
              >
                {item}
              </button>
            )
          })}
        </div>
        <p className="result-count" role="status">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
      </div>
      <div id="project-panel" role="tabpanel" aria-labelledby={filterId(filter)} className="project-grid" key={`${filter}-${audience}`}>
        {visible.length > 0 ? (
          visible.map(({ project, number }) => (
            <ProjectCard key={project.id} project={project} number={number} />
          ))
        ) : (
          <p className="empty-state">No projects in this category.</p>
        )}
      </div>
    </Section>
  )
}
