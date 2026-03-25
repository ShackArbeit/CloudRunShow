import type { ReactNode } from 'react'

type PageHeaderProps = {
  // eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageHeader({
  // eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="panel-surface relative overflow-hidden px-6 py-7 sm:px-8">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(246,178,74,0.24),_transparent_68%)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_rgba(31,138,133,0.45),_transparent)]" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
            {eyebrow}
          </p> */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              {title}
            </h1>
            <p className="text-sm leading-7 text-ink-700 sm:text-base">
              {description}
            </p>
          </div>
        </div>
        {actions ? <div className="relative self-start lg:self-auto">{actions}</div> : null}
      </div>
    </header>
  )
}
