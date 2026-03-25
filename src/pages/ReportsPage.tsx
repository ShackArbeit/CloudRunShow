import { ReportChart } from '../components/reports/ReportChart'
import { ReportFiltersPanel } from '../components/reports/ReportFiltersPanel'
import { ReportsPagination } from '../components/reports/ReportsPagination'
import { ReportsTable } from '../components/reports/ReportsTable'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { useReportFilters } from '../hooks/useReportFilters'
import { useReportsData } from '../hooks/useReportsData'
import { reportCategories } from '../mock/reports'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function ReportsPage() {
  const {
    filters,
    activeRangeLabel,
    setDateRange,
    setCategory,
    setPage,
  } = useReportFilters()

  const { data, isLoading, error, reload } = useReportsData(filters)

  const summary = data?.summary
  const table = data?.table
  const chartData = data?.chartData ?? []
  const hasData = Boolean(table && table.total > 0)

  return (
    <>
      <PageHeader
        title="Question Two: Data Analytics Report"
        description="Standardizing the visual hierarchy, filters, charts, and tables to make data exploration feel like a production-ready e-commerce dashboard."
        actions={
          <div className="glass-outline rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
            Commerce Analytics
          </div>
        }
      />

      <div className="grid gap-6">
        <Panel
          eyebrow="Filters"
          title="Report Filters"
          description={`Data will be automatically refetched after filter changes. Current range: ${activeRangeLabel}`}
        >
          <ReportFiltersPanel
            dateFrom={filters.dateFrom}
            dateTo={filters.dateTo}
            category={filters.category}
            categories={data?.categories ?? reportCategories}
            onDateChange={setDateRange}
            onCategoryChange={setCategory}
          />
        </Panel>

        {error ? (
          <Panel eyebrow="Error" title="Failed to Load Data">
            <EmptyState
              title="Unable to load report data"
              description={error}
              action={
                <button
                  type="button"
                  onClick={reload}
                  className="rounded-full bg-ink-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                >
                  Reload
                </button>
              }
            />
          </Panel>
        ) : null}

        <div className="grid gap-6">
          <Panel
            eyebrow="Snapshot"
            title="Business Summary"
            description="Summary, charts, and tables share the same filtered dataset to prevent inconsistent states across sections."
          >
            {isLoading && !data ? (
              <LoadingSpinner label="Loading report summary..." />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="interactive-card rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.88))] p-5">
                  <p className="text-sm text-ink-700">Total Revenue</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-ink-950">
                    {formatCurrency(summary?.totalRevenue ?? 0)}
                  </p>
                </div>

                <div className="interactive-card rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.88))] p-5">
                  <p className="text-sm text-ink-700">Orders</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-ink-950">
                    {summary?.totalOrders ?? 0}
                  </p>
                </div>

                <div className="interactive-card rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.88))] p-5">
                  <p className="text-sm text-ink-700">AOV</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-ink-950">
                    {formatCurrency(summary?.averageOrderValue ?? 0)}
                  </p>
                </div>

                <div className="interactive-card rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.88))] p-5">
                  <p className="text-sm text-ink-700">Paid Rate</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-ink-950">
                    {summary?.paidRate ?? 0}%
                  </p>
                </div>
              </div>
            )}
          </Panel>

          <Panel
            eyebrow="Trend"
            title="Revenue and Order Trends"
            description="Currently using Chart.js. It is lightweight for this scale, integrates well with React, and can be easily replaced with real APIs in the future."
          >
            {isLoading && !data ? (
              <LoadingSpinner label="Loading chart data..." />
            ) : chartData.length > 0 ? (
              <ReportChart data={chartData} />
            ) : (
              <EmptyState
                title="No chart data available"
                description="Please adjust the date range or category filters. The system will recalculate the trend chart."
              />
            )}
          </Panel>

          <Panel
            eyebrow="Orders"
            title="Order Details Table"
            description="Currently using frontend pagination. However, the response structure already includes total, page, pageSize, and totalPages, allowing a smooth transition to backend pagination in the future."
          >
            {isLoading && !data ? (
              <LoadingSpinner label="Loading table data..." />
            ) : hasData && table ? (
              <div className="space-y-4">
                <ReportsTable rows={table.items} />
                <ReportsPagination
                  page={table.page}
                  totalPages={table.totalPages}
                  total={table.total}
                  pageSize={table.pageSize}
                  onPageChange={setPage}
                />
              </div>
            ) : (
              <EmptyState
                title="No matching orders found"
                description="No data matches the current filter conditions, so an empty state is displayed instead of leaving a blank table."
              />
            )}
          </Panel>
        </div>
      </div>
    </>
  )
}