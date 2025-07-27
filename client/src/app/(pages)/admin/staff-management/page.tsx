"use client"
import AdminLayout from "@/components/layout/admin-layout"
import StaffManagementTable from "@/components/admin/staff-management-table"

export default function StaffManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Staff Management</h1>
          <p className="text-muted">Manage staff accounts and permissions</p>
        </div>
        <StaffManagementTable />
      </div>
    </AdminLayout>
  )
}
