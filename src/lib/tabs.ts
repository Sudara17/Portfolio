import type { KeyboardEvent } from 'react'

export function onTabListKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  tabIds: readonly string[],
  select: (index: number) => void,
) {
  const key = event.key
  if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return
  event.preventDefault()
  const last = tabIds.length - 1
  const next =
    key === 'ArrowRight'
      ? (index + 1) % tabIds.length
      : key === 'ArrowLeft'
        ? (index - 1 + tabIds.length) % tabIds.length
        : key === 'Home'
          ? 0
          : last
  select(next)
  document.getElementById(tabIds[next] ?? '')?.focus()
}
