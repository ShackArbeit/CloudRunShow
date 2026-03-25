import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type PanelProps = PropsWithChildren<{
  className?: string
  eyebrow?: string
  title?: string
  description?: string
  actions?: ReactNode
}>

export function Panel({
  className,
  eyebrow,
  title,
  description,
  actions,
  children,
}: PanelProps) {
  return (
    <section className={cn('panel-surface interactive-card p-6 sm:p-7', className)}>
      {(eyebrow || title || description || actions) && (
        <header className="mb-5 flex flex-col gap-4 border-b border-mist-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-700/70">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-2xl font-semibold text-ink-950">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-ink-700">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </header>
      )}
      {children}
    </section>
  )
}
