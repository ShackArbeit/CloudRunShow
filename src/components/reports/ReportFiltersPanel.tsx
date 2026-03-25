import type { ReportCategory } from '../../types/reports'

type ReportFiltersPanelProps = {
  dateFrom: string
  dateTo: string
  category: ReportCategory
  categories: ReportCategory[]
  onDateChange: (name: 'dateFrom' | 'dateTo', value: string) => void
  onCategoryChange: (category: ReportCategory) => void
}

export function ReportFiltersPanel({
  dateFrom,
  dateTo,
  category,
  categories,
  onDateChange,
  onCategoryChange,
}: ReportFiltersPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
      <div className="rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(244,247,251,0.85),_rgba(255,255,255,0.88))] p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700/70">
              Start Date
            </span>
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => onDateChange('dateFrom', event.target.value)}
              className="w-full rounded-[18px] border border-mist-200 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700/70">
              End Date
            </span>
            <input
              type="date"
              value={dateTo}
              onChange={(event) => onDateChange('dateTo', event.target.value)}
              className="w-full rounded-[18px] border border-mist-200 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </label>
        </div>
      </div>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700/70">
            Product Category
        </span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ReportCategory)}
          className=" w-full rounded-[24px] border border-mist-200 bg-white px-4 py-4 text-sm text-ink-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 xl:min-h-0"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
