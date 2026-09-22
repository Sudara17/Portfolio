import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { skillCategories } from '../data/skills.ts'
import type { Skill } from '../data/skills.ts'
import { onTabListKeyDown } from '../lib/tabs.ts'
import { Section } from './Section.tsx'

function matches(skill: Skill, query: string) {
  if (!query) return true
  return `${skill.name} ${skill.context ?? ''}`.toLowerCase().includes(query)
}

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? 'ai')
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const active = skillCategories.find((category) => category.id === activeId) ?? skillCategories[0]
  const tabIds = skillCategories.map((category) => `skill-tab-${category.id}`)

  const visible = useMemo(
    () => active?.skills.filter((skill) => matches(skill, normalized)) ?? [],
    [active, normalized],
  )

  const elsewhere = skillCategories
    .filter((category) => category.id !== active?.id)
    .map((category) => ({
      id: category.id,
      label: category.label,
      count: category.skills.filter((skill) => matches(skill, normalized)).length,
    }))
    .filter((category) => category.count > 0)

  if (!active) return null

  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      intro="Grouped from coursework, roles, and projects. Notes appear only where a technology is tied to specific work."
      band
    >
      <div className="skill-panel">
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category, index) => {
            const selected = category.id === active.id
            return (
              <button
                key={category.id}
                id={`skill-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="skill-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                onKeyDown={(event) =>
                  onTabListKeyDown(event, index, tabIds, (next) => {
                    const nextCategory = skillCategories[next]
                    if (nextCategory) setActiveId(nextCategory.id)
                  })
                }
              >
                <span>{category.label}</span>
                <span className="tab-count">{category.skills.length}</span>
              </button>
            )
          })}
        </div>
        <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active.id}`} className="skill-body">
          <div className="skill-toolbar">
            <label className="search-field">
              <Search aria-hidden="true" />
              <span className="sr-only">Search skills</span>
              <input
                type="search"
                value={query}
                placeholder="Search skills"
                onChange={(event) => setQuery(event.target.value)}
              />
              {query ? (
                <button type="button" className="clear-btn" onClick={() => setQuery('')} aria-label="Clear skill search">
                  <X aria-hidden="true" />
                </button>
              ) : null}
            </label>
            <p className="result-count" role="status">
              {visible.length} {visible.length === 1 ? 'skill' : 'skills'}
            </p>
          </div>
          {visible.length > 0 ? (
            <ul className="skill-grid" key={`${active.id}-${normalized}`}>
              {visible.map((skill) => (
                <li key={skill.name} className="skill-card">
                  <span className="skill-mark" aria-hidden="true">
                    {skill.mark}
                  </span>
                  <div>
                    <p className="skill-name">{skill.name}</p>
                    {skill.context ? <p className="skill-context">{skill.context}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>
                No skills in {active.label} match “{query.trim()}”.
              </p>
              {elsewhere.length > 0 ? (
                <div className="elsewhere">
                  <p>Matches in other groups:</p>
                  <div className="elsewhere-actions">
                    {elsewhere.map((category) => (
                      <button key={category.id} type="button" className="btn btn-ghost" onClick={() => setActiveId(category.id)}>
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
