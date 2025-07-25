"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import ReportsCharts from "@/components/reports/reports-charts"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Reports & Analytics</h1>
          <p className="text-muted">Analyze inventory trends and performance metrics</p>
        </div>
        <ReportsCharts />
      </div>
    </DashboardLayout>
  )
}
