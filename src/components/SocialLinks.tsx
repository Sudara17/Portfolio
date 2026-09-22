import { Mail } from 'lucide-react'
import { profile } from '../data/profile.ts'
import { GitHubIcon, LinkedInIcon } from './Icons.tsx'

const links = [
  {
    label: 'GitHub',
    href: profile.githubUrl,
    external: true,
    Icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedinUrl,
    external: true,
    Icon: LinkedInIcon,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    external: false,
    Icon: Mail,
  },
]

export function SocialLinks() {
  return (
    <ul className="social-list">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external
              ? { target: '_blank', rel: 'me noopener noreferrer' }
              : { rel: 'me' })}
          >
            <link.Icon />
            <span>{link.label}</span>
            {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
