import { useState } from 'react'
import { projectFilters, projects, type ProjectFilter } from '../data/projects.ts'
import { systemModules } from '../data/os.ts'
import { useSite } from '../context/SiteInteractions.tsx'
import { onTabListKeyDown } from '../lib/tabs.ts'
import { cx } from '../lib/cx.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { Section } from './Section.tsx'

function filterId(filter: ProjectFilter) {
  return `project-filter-${filter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export function Projects() {
  const { systemFocus } = useSite()
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const focusIds = systemFocus
    ? new Set(systemModules.find((module) => module.id === systemFocus)?.projectIds ?? [])
    : null
  const visible = projects
    .map((project, index) => ({ project, number: index + 1 }))
    .filter((item) => filter === 'All' || item.project.category === filter)
  const tabIds = projectFilters.map((item) => filterId(item))

  return (
    <Section id="projects" index="03" title="Projects">
      {systemFocus ? (
        <p className="focus-banner" role="status">
          System focus · {systemModules.find((module) => module.id === systemFocus)?.label}
        </p>
      ) : null}
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
      <div id="project-panel" role="tabpanel" aria-labelledby={filterId(filter)} className="project-grid" key={filter}>
        {visible.length > 0 ? (
          visible.map(({ project, number }) => (
            <div
              key={project.id}
              className={cx(focusIds && focusIds.size > 0 && !focusIds.has(project.id) && 'is-dimmed')}
            >
              <ProjectCard project={project} number={number} />
            </div>
          ))
        ) : (
          <p className="empty-state">No projects in this category.</p>
        )}
      </div>
    </Section>
  )
}
