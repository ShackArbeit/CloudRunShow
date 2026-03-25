import { cn } from '../../utils/cn'

type LoadingSpinnerProps = {
  className?: string
  label?: string
}

export function LoadingSpinner({
  className,
  label = 'Loading',
}: LoadingSpinnerProps) {
  return (
    <div className={cn('inline-flex items-center gap-3 text-sm font-medium text-ink-700', className)}>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-mist-300 border-t-teal-600 shadow-[0_0_0_3px_rgba(31,138,133,0.08)]" />
      <span>{label}</span>
    </div>
  )
}
