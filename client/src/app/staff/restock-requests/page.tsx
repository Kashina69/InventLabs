"use client"
import StaffLayout from "@/components/layout/staff-layout"
import RestockRequestsTable from "@/components/staff/restock-requests-table"
import CreateRestockRequestButton from "@/components/staff/create-restock-request-button"

export default function RestockRequestsPage() {
  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Restock Requests</h1>
            <p className="text-muted">View and manage your restock requests</p>
          </div>
          <CreateRestockRequestButton />
        </div>
        <RestockRequestsTable />
      </div>
    </StaffLayout>
  )
}
