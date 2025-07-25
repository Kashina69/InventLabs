"use client"
import StaffLayout from "@/components/layout/staff-layout"
import ProductsTable from "@/components/staff/products-table"

export default function StaffDashboard() {
  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Products</h1>
          <p className="text-muted">View all products in the inventory</p>
        </div>
        <ProductsTable />
      </div>
    </StaffLayout>
  )
}
