import { useMemo, useState } from 'react'
import { osStats, systemModules, type SystemId } from '../data/os.ts'
import { useSite } from '../context/SiteInteractions.tsx'
import { cx } from '../lib/cx.ts'

export function SudaraOsDashboard() {
  const { systemFocus, setSystemFocus } = useSite()
  const [open, setOpen] = useState(true)
  const active = useMemo(
    () => systemModules.find((module) => module.id === systemFocus) ?? null,
    [systemFocus],
  )

  function toggle(id: SystemId) {
    setSystemFocus(systemFocus === id ? null : id)
  }

  function activate(id: SystemId) {
    const module = systemModules.find((item) => item.id === id)
    setSystemFocus(id)
    if (!module) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(module.href.slice(1))?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="os-dashboard" aria-labelledby="os-dash-title">
      <div className="container">
        <div className="os-shell">
          <header className="os-shell-head">
            <div>
              <p className="os-kicker">SUDARA OS</p>
              <h2 id="os-dash-title">AI Developer Operating System</h2>
              <p className="os-sub">AI &amp; Data Science · interactive workspace for projects, systems, and decisions</p>
            </div>
            <button type="button" className="btn btn-ghost" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
              {open ? 'Collapse' : 'Expand'}
            </button>
          </header>

          <div className="os-status-row">
            <p className="os-status">
              <span className="os-dot" aria-hidden="true" />
              System status · Available
            </p>
            <p className="os-identity">Sudara T S M</p>
          </div>

          {open ? (
            <>
              <div className="os-grid">
                <div>
                  <p className="os-label">Active systems</p>
                  <div className="os-systems" role="group" aria-label="Active systems">
                    {systemModules.map((module) => (
                      <button
                        key={module.id}
                        type="button"
                        className={cx('os-chip', systemFocus === module.id && 'is-active')}
                        aria-pressed={systemFocus === module.id}
                        onClick={() => toggle(module.id)}
                        onDoubleClick={() => activate(module.id)}
                      >
                        {module.label}
                      </button>
                    ))}
                  </div>
                  {active ? (
                    <p className="os-active-detail" role="status">
                      {active.detail}{' '}
                      <button type="button" className="text-link" onClick={() => activate(active.id)}>
                        Inspect
                      </button>
                    </p>
                  ) : (
                    <p className="os-active-detail">Select a system to highlight related experience, projects, and skills.</p>
                  )}
                </div>
                <dl className="os-stats">
                  <div>
                    <dt>Projects</dt>
                    <dd>{String(osStats.projects).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>Experience</dt>
                    <dd>{String(osStats.experience).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>AI systems</dt>
                    <dd>{String(osStats.aiSystems).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>Publications</dt>
                    <dd>{String(osStats.publications).padStart(2, '0')}</dd>
                  </div>
                </dl>
              </div>
              {systemFocus ? (
                <button type="button" className="btn btn-ghost os-clear" onClick={() => setSystemFocus(null)}>
                  Clear system focus
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
