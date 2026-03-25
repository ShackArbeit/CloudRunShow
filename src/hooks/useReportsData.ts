import { useEffect, useMemo, useState } from 'react'
import { fetchReports } from '../services/reportService'
import type { ReportFilters, ReportsResponse } from '../types/reports'

type ReportsState = {
  data: ReportsResponse | null
  error: string | null
  lastSettledKey: string
}

export function useReportsData(filters: ReportFilters) {
  const [reloadToken, setReloadToken] = useState(0)
  const [state, setState] = useState<ReportsState>({
    data: null,
    error: null,
    lastSettledKey: '',
  })
  const requestKey = useMemo(
    () => JSON.stringify({ filters, reloadToken }),
    [filters, reloadToken],
  )

  useEffect(() => {
    let cancelled = false

    void fetchReports(filters)
      .then((response) => {
        if (cancelled) {
          return
        }

        setState({
          data: response,
          error: null,
          lastSettledKey: requestKey,
        })
      })
      .catch((error: Error) => {
        if (cancelled) {
          return
        }

        setState({
          data: null,
          error: error.message,
          lastSettledKey: requestKey,
        })
      })

    return () => {
      cancelled = true
    }
  }, [filters, requestKey])

  const isLoading = state.lastSettledKey !== requestKey

  function reload() {
    setReloadToken((current) => current + 1)
  }

  return {
    data: state.data,
    error: state.lastSettledKey === requestKey ? state.error : null,
    isLoading,
    reload,
  }
}
