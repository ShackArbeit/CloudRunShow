import type { OrderRecord, OrderStatus } from '../../types/reports'

const statusClassNames: Record<OrderStatus, string> = {
  Paid: 'bg-emerald-500/12 text-emerald-500',
  Pending: 'bg-amber-400/18 text-ink-900',
  Shipped: 'bg-teal-500/12 text-teal-600',
  Refunded: 'bg-rose-500/12 text-rose-500',
  Cancelled: 'bg-mist-200 text-ink-700',
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)
}

type ReportsTableProps = {
  rows: OrderRecord[]
}

export function ReportsTable({ rows }: ReportsTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-mist-200">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white text-left">
          <thead className="bg-mist-50 text-xs uppercase tracking-[0.18em] text-ink-700/72">
            <tr>
              <th className="px-5 py-4 font-semibold">Order ID</th>
              <th className="px-5 py-4 font-semibold">Customer</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-mist-100 text-sm text-ink-900 transition hover:bg-mist-50/70"
              >
                <td className="px-5 py-4 font-medium">{row.id}</td>
                <td className="px-5 py-4">{row.customerName}</td>
                <td className="px-5 py-4 text-ink-700">{row.orderDate}</td>
                <td className="px-5 py-4 text-ink-700">{row.category}</td>
                <td className="px-5 py-4 font-semibold">{formatCurrency(row.amount)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusClassNames[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
