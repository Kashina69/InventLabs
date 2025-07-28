"use client"
import AdminLayout from "@/components/layout/admin-layout"
import OverviewCards from "@/components/dashboard/overview-cards"
import StockChart from "@/components/dashboard/stock-chart"
import RecentLogs from "@/components/dashboard/recent-logs"
import { useEffect } from "react"
import axios from "@/config/axios"
import { useDashboardStore } from "@/store/dashboard"

export default function AdminDashboard() {
  const { setDashboardData, setIsLoading } = useDashboardStore()
  
  useEffect(() => {
    setIsLoading(true)
    axios.get("/dashboard")
      .then(res => {
        console.log("Dashboard data:", res.data)
        // Transform the data to include totalStocks
        const dashboardData = {
          ...res.data,
          totalStocks: res.data.productStock || 0
        }
        setDashboardData(dashboardData)
      })
      .catch(err => {
        console.error("Error fetching /dashboard:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setDashboardData, setIsLoading])

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
