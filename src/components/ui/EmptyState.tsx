import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[24px] border border-dashed border-mist-300 bg-[linear-gradient(180deg,_rgba(244,247,251,0.92),_rgba(255,255,255,0.9))] p-6 text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-[0_12px_24px_rgba(39,71,107,0.12)]">
        O
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-ink-950">{title}</h3>
        <p className="max-w-xl text-sm leading-6 text-ink-700">{description}</p>
      </div>
      {action}
    </div>
  )
}
