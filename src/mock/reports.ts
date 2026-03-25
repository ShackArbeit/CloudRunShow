import type {
  OrderRecord,
  OrderStatus,
  ReportCategory,
} from '../types/reports'

const categories: Exclude<ReportCategory, 'All'>[] = [
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Sports',
]

const statuses: OrderStatus[] = [
  'Paid',
  'Pending',
  'Shipped',
  'Refunded',
  'Cancelled',
]

const customerNames = [
  'Avery Chen',
  'Mia Lin',
  'Noah Wang',
  'Olivia Hsu',
  'Lucas Tsai',
  'Chloe Wu',
  'Ethan Liu',
  'Grace Huang',
  'Henry Kuo',
  'Ivy Chang',
  'Jack Su',
  'Nora Yeh',
]

const amountsByCategory: Record<Exclude<ReportCategory, 'All'>, number> = {
  Electronics: 4200,
  Fashion: 1800,
  Home: 2600,
  Beauty: 1400,
  Sports: 2200,
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function toIsoDate(date: Date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-')
}

function seededValue(index: number, seed: number) {
  return ((index * 37 + seed * 17) % 1000) / 1000
}

function createOrder(index: number): OrderRecord {
  const category = categories[index % categories.length]!
  const status = statuses[(index * 3) % statuses.length]!
  const customerName = customerNames[index % customerNames.length]!
  const date = new Date('2026-01-01T00:00:00')
  date.setDate(date.getDate() + index)

  const amountBase = amountsByCategory[category]
  const amount = Math.round(amountBase + seededValue(index, 3) * 3200)

  return {
    id: `ORD-2026-${pad(index + 1)}${pad((index % 28) + 1)}`,
    customerName,
    orderDate: toIsoDate(date),
    category,
    amount,
    status,
  }
}

export const reportCategories: ReportCategory[] = ['All', ...categories]

export const mockOrders: OrderRecord[] = Array.from({ length: 120 }, (_, index) =>
  createOrder(index),
)
