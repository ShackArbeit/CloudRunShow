import { useMemo, useState } from 'react'
import type { ReportCategory, ReportFilters } from '../types/reports'

export function useReportFilters() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateFrom: '',
    dateTo: '',
    category: 'All',
    page: 1,
    pageSize: 8,
  })

  function setDateRange(name: 'dateFrom' | 'dateTo', value: string) {
    setFilters((current) => ({
      ...current,
      [name]: value,
      page: 1,
    }))
  }

  function setCategory(category: ReportCategory) {
    setFilters((current) => ({
      ...current,
      category,
      page: 1,
    }))
  }

  function setPage(page: number) {
    setFilters((current) => ({
      ...current,
      page,
    }))
  }

  const activeRangeLabel = useMemo(() => {
    if (!filters.dateFrom && !filters.dateTo) {
      return 'No date range selected'
    }

    const fromLabel = filters.dateFrom || 'Not selected'
    const toLabel = filters.dateTo || 'Not selected'

    return `${fromLabel} → ${toLabel}`
  }, [filters.dateFrom, filters.dateTo])

  return {
    filters,
    activeRangeLabel,
    setDateRange,
    setCategory,
    setPage,
  }
}