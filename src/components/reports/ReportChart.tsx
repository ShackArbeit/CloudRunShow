import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { ChartDataPoint } from '../../types/reports'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

type ReportChartProps = {
  data: ChartDataPoint[]
}

export function ReportChart({ data }: ReportChartProps) {
  return (
    <div className="rounded-[24px] border border-mist-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(237,242,247,0.86))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <Line
        data={{
          labels: data.map((point) => point.label),
          datasets: [
            {
              label: 'Revenue',
              data: data.map((point) => point.revenue),
              borderColor: '#1f8a85',
              backgroundColor: 'rgba(31, 138, 133, 0.12)',
              fill: true,
              tension: 0.35,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
            {
              label: 'Orders',
              data: data.map((point) => point.orders),
              borderColor: '#f6b24a',
              backgroundColor: 'rgba(246, 178, 74, 0.1)',
              tension: 0.35,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                color: '#16314f',
              },
            },
            tooltip: {
              backgroundColor: '#102033',
              padding: 12,
              displayColors: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#44678e',
              },
            },
            y: {
              grid: {
                color: 'rgba(201, 215, 230, 0.5)',
              },
              ticks: {
                color: '#44678e',
              },
            },
          },
        }}
        height={280}
      />
    </div>
  )
}
