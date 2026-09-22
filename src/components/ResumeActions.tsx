import { resumeDownloadName, resumeFileReady, resumeUrl } from '../lib/resume.ts'

type Kind = 'download' | 'open'
type Variant = 'secondary' | 'ghost'

type LinkProps = {
  kind: Kind
  variant: Variant
  noteId: string
}

export function ResumeLink({ kind, variant, noteId }: LinkProps) {
  const label = kind === 'download' ? 'Download Resume' : 'Open Resume'

  if (resumeFileReady) {
    if (kind === 'download') {
      return (
        <a className={`btn btn-${variant}`} href={resumeUrl} download={resumeDownloadName}>
          {label}
        </a>
      )
    }
    return (
      <a className={`btn btn-${variant}`} href={resumeUrl} target="_blank" rel="noopener noreferrer">
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      aria-describedby={noteId}
      onClick={() => document.getElementById(noteId)?.focus()}
    >
      {label}
    </button>
  )
}

export function ResumeMissing({ id }: { id: string }) {
  if (resumeFileReady) return null

  return (
    <p id={id} className="resume-note" tabIndex={-1} role="status">
      The resume PDF is not in the site yet. Save it as <code>public/resume.pdf</code>. It will be
      served at <code>{resumeUrl}</code>. Restart the dev server or rebuild, and Download and Open will use that file.
    </p>
  )
}
