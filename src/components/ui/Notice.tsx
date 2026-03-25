import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type NoticeVariant = 'success' | 'warning' | 'error' | 'info'

const variantClasses: Record<NoticeVariant, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  warning: 'border-amber-400/40 bg-amber-400/10 text-ink-900',
  error: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
  info: 'border-teal-500/25 bg-teal-500/10 text-teal-600',
}

type NoticeProps = {
  children: ReactNode
  variant?: NoticeVariant
  className?: string
}

export function Notice({
  children,
  variant = 'info',
  className,
}: NoticeProps) {
  return (
    <div
      className={cn(
        'rounded-[22px] border px-4 py-3 text-sm leading-6',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  )
}
