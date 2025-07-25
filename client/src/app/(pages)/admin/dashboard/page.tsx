"use client"
import AdminLayout from "@/components/layout/admin-layout"
import OverviewCards from "@/components/dashboard/overview-cards"
import StockChart from "@/components/dashboard/stock-chart"
import RecentLogs from "@/components/dashboard/recent-logs"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted text-sm sm:text-base">Welcome back! Here's your inventory overview.</p>
        </div>

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <StockChart />
          </div>
          <div>
            <RecentLogs />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
