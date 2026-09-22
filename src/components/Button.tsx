import type { ReactNode } from 'react'
import { cx } from '../lib/cx.ts'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  href,
  className,
  type = 'button',
  disabled,
  onClick,
}: Props) {
  const classes = cx('btn', `btn-${variant}`, className)
  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
