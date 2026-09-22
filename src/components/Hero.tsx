import { profile } from '../data/profile.ts'
import { useSite, type Audience } from '../context/SiteInteractions.tsx'
import { cx } from '../lib/cx.ts'
import { onTabListKeyDown } from '../lib/tabs.ts'
import { Button } from './Button.tsx'
import { NetworkVisual } from './NetworkVisual.tsx'
import { ResumeLink } from './ResumeActions.tsx'
import { SocialLinks } from './SocialLinks.tsx'

const modes: { id: Audience; label: string }[] = [
  { id: 'recruiter', label: 'Recruiter' },
  { id: 'developer', label: 'Developer' },
  { id: 'aiml', label: 'AI/ML' },
]

export function Hero() {
  const { audience, setAudience } = useSite()

  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-name">{profile.name}</p>
          <p className="kicker">{profile.identity}</p>
          <h1 id="home-title">{profile.headline}</h1>
          <p className="lede">{profile.lede}</p>
          <div className="mode-switch" role="radiogroup" aria-label="Portfolio emphasis">
            {modes.map((mode, index) => (
              <button
                key={mode.id}
                id={`audience-${mode.id}`}
                type="button"
                role="radio"
                aria-checked={audience === mode.id}
                tabIndex={audience === mode.id ? 0 : -1}
                className={cx(audience === mode.id && 'is-selected')}
                onClick={() => setAudience(mode.id)}
                onKeyDown={(event) =>
                  onTabListKeyDown(
                    event,
                    index,
                    modes.map((item) => `audience-${item.id}`),
                    (next) => {
                      const selected = modes[next]
                      if (selected) setAudience(selected.id)
                    },
                  )
                }
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="hero-cta">
            <div className={cx('hero-actions', audience === 'recruiter' && 'resume-focus')}>
              <Button href="#projects">View My Work</Button>
              <ResumeLink kind="download" variant="secondary" />
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
              <ResumeLink kind="open" variant="ghost" />
            </div>
          </div>
          <SocialLinks />
        </div>
        <NetworkVisual />
      </div>
    </section>
  )
}
