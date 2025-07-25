"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import UserManagement from "@/components/users/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">User Management</h1>
          <p className="text-muted">Manage user accounts and permissions</p>
        </div>
        <UserManagement />
      </div>
    </DashboardLayout>
  )
}
