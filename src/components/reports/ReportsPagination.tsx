type ReportsPaginationProps = {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function ReportsPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: ReportsPaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-mist-200 bg-mist-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ink-700">
        Showing {from}-{to} of {total} orders
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-full border border-mist-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700 transition hover:-translate-y-0.5 hover:border-mist-300 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Prev
        </button>
        <div className="rounded-full bg-ink-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          {page} / {totalPages}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-full border border-mist-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700 transition hover:-translate-y-0.5 hover:border-mist-300 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>
    </div>
  )
}
