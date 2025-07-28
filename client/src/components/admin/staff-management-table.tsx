"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2, User } from "lucide-react"
import CreateStaffModal from "./create-staff-modal"
import { useStaffStore } from "@/store/staff"

export default function StaffManagementTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [deleteStaffId, setDeleteStaffId] = useState<number | null>(null)

  const {
    staff,
    isLoading,
    error,
    fetchStaff,
    deleteStaff,
    setSearchTerm: setStoreSearchTerm,
    clearError
  } = useStaffStore()

  // Fetch staff on component mount
  useEffect(() => {
    fetchStaff()
  }, [fetchStaff])

  // Handle search changes
  useEffect(() => {
    fetchStaff(searchTerm)
  }, [searchTerm, fetchStaff])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setStoreSearchTerm(value)
  }

  const handleEditStaff = (staffMember: any) => {
    setEditingStaff(staffMember)
    setIsCreateModalOpen(true)
  }

  const handleDeleteStaff = async (staffId: number) => {
    try {
      await deleteStaff(staffId)
      setDeleteStaffId(null)
    } catch (error) {
      console.error("Failed to delete staff:", error)
    }
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
    setEditingStaff(null)
    clearError()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400"
      case "Inactive":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="bg-surface rounded-xl sm:rounded-2xl border border-custom">
      <div className="p-4 sm:p-6 border-b border-custom">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-primary">Staff Accounts</h2>
              <p className="text-muted text-sm">Manage staff accounts and permissions</p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors touch-manipulation sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Staff Member
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 border-b border-custom">
          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        {staff.map((member) => (
          <div key={member.id} className="p-4 border-b border-custom last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{member.name}</h3>
                  <p className="text-sm text-muted">{member.email}</p>
                  {member.phone && <p className="text-sm text-muted">{member.phone}</p>}
                </div>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor("Active")}`}
              >
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">Created: {new Date(member.createdAt).toLocaleDateString()}</p>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 text-muted hover:text-accent transition-colors touch-manipulation"
                  onClick={() => handleEditStaff(member)}
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button 
                  className="p-2 text-muted hover:text-danger transition-colors touch-manipulation"
                  onClick={() => setDeleteStaffId(member.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Staff Member
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-primary">{member.name}</div>
                      <div className="text-sm text-muted">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-primary">{member.email}</div>
                    {member.phone && <div className="text-xs text-muted">{member.phone}</div>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {new Date(member.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor("Active")}`}
                  >
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-muted hover:text-accent transition-colors touch-manipulation"
                      onClick={() => handleEditStaff(member)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button 
                      className="p-1 text-muted hover:text-danger transition-colors touch-manipulation"
                      onClick={() => setDeleteStaffId(member.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {staff.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted">
            {searchTerm
              ? "No staff members found matching your criteria."
              : "No staff members found. Add your first staff member to get started."}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted mt-2">Loading staff members...</p>
        </div>
      )}

      <CreateStaffModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        initialData={editingStaff}
      />

      {/* Delete Confirmation Modal */}
      {deleteStaffId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl border border-custom w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Delete Staff Member</h3>
              <p className="text-muted mb-6">
                Are you sure you want to delete this staff member? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteStaffId(null)}
                  className="flex-1 px-4 py-2 border border-custom bg-background text-primary rounded-lg font-medium hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteStaff(deleteStaffId)}
                  disabled={isLoading}
                  className="flex-1 bg-danger text-white px-4 py-2 rounded-lg font-medium hover:bg-danger/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
