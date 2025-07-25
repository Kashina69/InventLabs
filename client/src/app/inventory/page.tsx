"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import InventoryTable from "@/components/inventory/inventory-table"

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Inventory Management</h1>
            <p className="text-muted">Manage your product inventory and stock levels</p>
          </div>
        </div>
        <InventoryTable />
      </div>
    </DashboardLayout>
  )
}
