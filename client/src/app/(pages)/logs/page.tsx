"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import InventoryLogsTable from "@/components/logs/inventory-logs-table"

export default function LogsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Inventory Logs</h1>
          <p className="text-muted">Track all inventory movements and changes</p>
        </div>
        <InventoryLogsTable />
      </div>
    </DashboardLayout>
  )
}
