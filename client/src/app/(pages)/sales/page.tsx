"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import SalesTable from "@/components/sales/sales-table"

export default function SalesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Sales</h1>
          <p className="text-muted">View and manage all sales transactions</p>
        </div>

        <SalesTable />
      </div>
    </DashboardLayout>
  )
}
