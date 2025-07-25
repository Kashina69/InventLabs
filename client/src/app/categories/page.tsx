"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import CategoriesTable from "@/components/categories/categories-table"

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Category Management</h1>
            <p className="text-muted">Manage product categories and organize your inventory</p>
          </div>
        </div>
        <CategoriesTable />
      </div>
    </DashboardLayout>
  )
}
