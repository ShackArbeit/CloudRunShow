export type ReportCategory =
  | 'All'
  | 'Electronics'
  | 'Fashion'
  | 'Home'
  | 'Beauty'
  | 'Sports'

export type OrderStatus =
  | 'Paid'
  | 'Pending'
  | 'Shipped'
  | 'Refunded'
  | 'Cancelled'

export type ReportFilters = {
  dateFrom: string
  dateTo: string
  category: ReportCategory
  page: number
  pageSize: number
}

export type OrderRecord = {
  id: string
  customerName: string
  orderDate: string
  category: Exclude<ReportCategory, 'All'>
  amount: number
  status: OrderStatus
}

export type ChartDataPoint = {
  label: string
  revenue: number
  orders: number
}

export type ReportSummary = {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  paidRate: number
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ReportsResponse = {
  filters: Pick<ReportFilters, 'dateFrom' | 'dateTo' | 'category'>
  summary: ReportSummary
  chartData: ChartDataPoint[]
  categories: ReportCategory[]
  table: PaginatedResponse<OrderRecord>
}
