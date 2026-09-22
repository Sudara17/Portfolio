import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { LoaderCircle } from 'lucide-react'
import { profile } from '../data/profile.ts'
import {
  buildMailto,
  contactDraft,
  emptyContact,
  hasContactErrors,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../lib/contact.ts'
import { Button } from './Button.tsx'
import { ResumeLink } from './ResumeActions.tsx'
import { Section } from './Section.tsx'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
] as const

export function Contact() {
  const [values, setValues] = useState<ContactValues>(emptyContact)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitted, setSubmitted] = useState<ContactValues | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const requestRef = useRef(0)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  function update(name: keyof ContactValues, value: string) {
    requestRef.current += 1
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status !== 'idle') setStatus('idle')
    setCopied(false)
    setCopyError(false)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (hasContactErrors(nextErrors)) {
      setStatus('error')
      const first = (['name', 'email', 'message'] as const).find((key) => nextErrors[key])
      if (first) document.getElementById(`contact-${first}`)?.focus()
      return
    }

    const trimmed: ContactValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }
    setStatus('submitting')
    const request = requestRef.current + 1
    requestRef.current = request
    timeoutRef.current = window.setTimeout(() => {
      if (request !== requestRef.current) return
      window.location.href = buildMailto(profile.email, trimmed)
      setSubmitted(trimmed)
      setStatus('success')
    }, 240)
  }

  async function copyDraft() {
    if (!submitted) return
    const draft = contactDraft(submitted)
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopied(false)
      setCopyError(true)
      const area = document.getElementById('contact-draft')
      if (area instanceof HTMLTextAreaElement) {
        area.focus()
        area.select()
      }
    }
  }

  return (
    <Section
      id="contact"
      index="06"
      title="Contact"
      intro="Email, phone, and professional profiles."
    >
      <div className="contact-layout">
        <div className="panel">
          <h3>Direct contact</h3>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.githubUrl} target="_blank" rel="me noopener noreferrer">
                  {profile.github}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedinUrl} target="_blank" rel="me noopener noreferrer">
                  {profile.linkedin}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
          <h3 className="resume-heading">Resume</h3>
          <div className="resume-inline">
            <ResumeLink kind="download" variant="secondary" />
            <ResumeLink kind="open" variant="ghost" />
            <ResumeLink kind="view" variant="ghost" />
          </div>
        </div>

        <form className="panel contact-form" noValidate onSubmit={onSubmit} aria-describedby="contact-fallback" aria-busy={status === 'submitting'}>
          <h3>Write a message</h3>
          <p id="contact-fallback" className="form-note">
            This opens your email app with a draft. The message is not sent from this website.
          </p>
          <div className="form-row">
            {fields.map((field) => {
              const error = errors[field.name]
              const errorId = `contact-${field.name}-error`
              return (
                <div className="form-field" key={field.name}>
                  <label htmlFor={`contact-${field.name}`}>{field.label}</label>
                  <input
                    id={`contact-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    inputMode={field.name === 'email' ? 'email' : undefined}
                    maxLength={field.name === 'email' ? 200 : 100}
                    required
                    aria-required="true"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    value={values[field.name]}
                    onChange={(event) => update(field.name, event.target.value)}
                  />
                  {error ? (
                    <p id={errorId} className="field-error">
                      {error}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              aria-required="true"
              maxLength={1200}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
            />
            {values.message.length > 1000 ? (
              <p className="field-hint">{1200 - values.message.length} characters left</p>
            ) : null}
            {errors.message ? (
              <p id="contact-message-error" className="field-error">
                {errors.message}
              </p>
            ) : null}
          </div>
          {status === 'error' ? (
            <p className="form-banner error" role="alert">
              Check the highlighted fields.
            </p>
          ) : null}
          {status === 'success' && submitted ? (
            <div className="form-banner success" role="status">
              <p>
                Your email app should open with a draft to {profile.email}. If nothing opens, copy the draft
                or use the email link.
              </p>
              <textarea id="contact-draft" readOnly rows={5} value={contactDraft(submitted)} aria-label="Email draft" />
              <button type="button" className="btn btn-ghost" onClick={() => void copyDraft()}>
                {copied ? 'Copied' : 'Copy draft'}
              </button>
              {copyError ? (
                <p className="field-error" role="alert">
                  Could not copy automatically. Select the draft and copy it manually.
                </p>
              ) : null}
            </div>
          ) : null}
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? <LoaderCircle className="spin" aria-hidden="true" /> : null}
            {status === 'submitting' ? 'Opening email…' : 'Open email draft'}
          </Button>
        </form>
      </div>
    </Section>
  )
}
