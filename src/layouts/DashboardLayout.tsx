import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/navigation/Sidebar'

export function DashboardLayout() {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  )
}
