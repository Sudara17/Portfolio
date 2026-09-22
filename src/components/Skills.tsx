import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { skillCategories } from '../data/skills.ts'
import type { Skill } from '../data/skills.ts'
import { systemModules } from '../data/os.ts'
import { traceFor } from '../data/traces.ts'
import { useSite } from '../context/SiteInteractions.tsx'
import { cx } from '../lib/cx.ts'
import { onTabListKeyDown } from '../lib/tabs.ts'
import { Section } from './Section.tsx'

function SkillDetail({
  skill,
  trace,
}: {
  skill: Skill
  trace: ReturnType<typeof traceFor>
}) {
  return (
    <div className="skill-detail" role="status">
      {trace ? (
        <ol className="trace">
          {trace.steps.map((step, index) => (
            <li key={`${step.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true">↓</span> : null}
              {step.href ? <a href={step.href}>{step.label}</a> : <span>{step.label}</span>}
            </li>
          ))}
        </ol>
      ) : (
        <p>{skill.context ?? `${skill.name} is listed in the portfolio skill set.`}</p>
      )}
    </div>
  )
}

function matches(skill: Skill, query: string) {
  if (!query) return true
  return `${skill.name} ${skill.context ?? ''}`.toLowerCase().includes(query)
}

export function Skills() {
  const { systemFocus } = useSite()
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? 'ai')
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const active = skillCategories.find((category) => category.id === activeId) ?? skillCategories[0]
  const tabIds = skillCategories.map((category) => `skill-tab-${category.id}`)
  const focusSkills = systemFocus
    ? new Set(systemModules.find((module) => module.id === systemFocus)?.skillNames ?? [])
    : null

  const [pinned, setPinned] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const visible = useMemo(
    () => active?.skills.filter((skill) => matches(skill, normalized)) ?? [],
    [active, normalized],
  )
  const selectedName = pinned ?? hovered
  const selected = visible.find((skill) => skill.name === selectedName)
  const trace = selected ? traceFor(selected.name) : undefined

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
      index="05"
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
            <>
              <ul className="skill-grid" key={`${active.id}-${normalized}`}>
                {visible.map((skill) => {
                  const connected = Boolean(traceFor(skill.name))
                  const pressed = pinned === skill.name
                  return (
                    <li key={skill.name}>
                      <button
                        type="button"
                        className={cx(
                          'skill-card',
                          pressed && 'is-selected',
                          focusSkills && focusSkills.size > 0 && !focusSkills.has(skill.name) && 'is-dimmed',
                        )}
                        aria-pressed={pressed}
                        onMouseEnter={() => setHovered(skill.name)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(skill.name)}
                        onBlur={() => setHovered(null)}
                        onClick={() => setPinned((current) => (current === skill.name ? null : skill.name))}
                      >
                        <span className="skill-mark" aria-hidden="true">
                          {skill.mark}
                        </span>
                        <span>
                          <span className="skill-name">{skill.name}</span>
                          {connected ? <span className="skill-trace-label">Trace Skill</span> : null}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {selected ? <SkillDetail skill={selected} trace={trace} /> : null}
            </>
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
