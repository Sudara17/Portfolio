import { navItems } from '../data/navigation.ts'
import { profile } from '../data/profile.ts'
import { SocialLinks } from './SocialLinks.tsx'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-role">{profile.identity}</p>
          <p className="footer-note">Built with modern web technologies.</p>
          <p className="footer-stack">React, TypeScript, and Vite.</p>
        </div>
        <div>
          <p className="footer-label">Quick links</p>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">Profiles</p>
          <SocialLinks />
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} {profile.name}</p>
      </div>
    </footer>
  )
}
