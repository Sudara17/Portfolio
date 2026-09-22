export type ContactValues = {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emptyContact: ContactValues = {
  name: '',
  email: '',
  message: '',
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Name should be at least 2 characters.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'

  if (!message) errors.message = 'Enter a message.'
  else if (message.length < 10) errors.message = 'Message should be at least 10 characters.'
  else if (message.length > 1200) {
    errors.message = 'Keep the message under 1,200 characters so your email app can open it.'
  }

  return errors
}

export function hasContactErrors(errors: ContactErrors) {
  return Boolean(errors.name || errors.email || errors.message)
}

export function contactDraft(values: ContactValues) {
  return `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
}

export function buildMailto(to: string, values: ContactValues) {
  const subject = `Portfolio message from ${values.name.trim()}`
  const body = contactDraft(values)
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
