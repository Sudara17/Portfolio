import { RESUME_URL } from '../lib/resume.ts'

type Kind = 'download' | 'open' | 'view'
type Variant = 'primary' | 'secondary' | 'ghost'

const labels: Record<Kind, string> = {
  download: 'Download Resume',
  open: 'Open Resume',
  view: 'View Resume',
}

export function ResumeLink({ kind, variant }: { kind: Kind; variant: Variant }) {
  return (
    <a className={`btn btn-${variant} resume-link`} href={RESUME_URL} target="_blank" rel="noopener noreferrer">
      {labels[kind]}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
