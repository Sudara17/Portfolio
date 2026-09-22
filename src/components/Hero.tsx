import { profile } from '../data/profile.ts'
import { Button } from './Button.tsx'
import { NetworkVisual } from './NetworkVisual.tsx'
import { ResumeLink, ResumeMissing } from './ResumeActions.tsx'
import { SocialLinks } from './SocialLinks.tsx'

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-name">{profile.name}</p>
          <p className="kicker">{profile.identity}</p>
          <h1 id="home-title">{profile.headline}</h1>
          <p className="lede">{profile.lede}</p>
          <div className="hero-cta">
            <div className="hero-actions">
              <Button href="#projects">View My Work</Button>
              <ResumeLink kind="download" variant="secondary" noteId="hero-resume-note" />
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
              <ResumeLink kind="open" variant="ghost" noteId="hero-resume-note" />
            </div>
            <ResumeMissing id="hero-resume-note" />
          </div>
          <SocialLinks />
        </div>
        <NetworkVisual />
      </div>
    </section>
  )
}
