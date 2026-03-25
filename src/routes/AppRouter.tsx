import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { LoginPage } from '../pages/LoginPage'
import { ReportsPage } from '../pages/ReportsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
