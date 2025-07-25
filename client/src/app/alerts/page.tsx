"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AlertsList from "@/components/alerts/alerts-list"

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Stock Alerts</h1>
          <p className="text-muted">Monitor low stock and out-of-stock items</p>
        </div>
        <AlertsList />
      </div>
    </DashboardLayout>
  )
}
