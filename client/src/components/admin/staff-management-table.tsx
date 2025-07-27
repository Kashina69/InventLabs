"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, User } from "lucide-react"
import CreateStaffModal from "./create-staff-modal"

// Mock staff data
const staffData = [
  {
    id: 2,
    name: "Staff User",
    email: "staff@example.com",
    businessName: "Tech Solutions Inc",
    industryType: "Technology",
    createdAt: "2024-01-10",
    status: "Active",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    businessName: "Retail Store Co",
    industryType: "Retail",
    createdAt: "2024-01-08",
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    businessName: "Manufacturing Ltd",
    industryType: "Manufacturing",
    createdAt: "2024-01-05",
    status: "Inactive",
  },
]

export default function StaffManagementTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [staff, setStaff] = useState(staffData)
  const [editingStaff, setEditingStaff] = useState(null);


  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleCreateStaff = (newStaff) => {
    if (editingStaff) {
      const updatedStaff = staff.map((s) =>
        s.id === editingStaff.id ? { ...s, ...newStaff } : s
      );
      setStaff(updatedStaff);
      setEditingStaff(null);
    } else {
      const staffMember = {
        id: staff.length + 10,
        ...newStaff,
        createdAt: new Date().toISOString().split("T")[0],
        status: "Active",
      };
      setStaff([...staff, staffMember]);
    }
    setIsCreateModalOpen(false);
  };


  const getStatusColor = (status) => {
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
              <p className="text-muted text-sm">Manage staff accounts and business information</p>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        {filteredStaff.map((member) => (
          <div key={member.id} className="p-4 border-b border-custom last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{member.name}</h3>
                  <p className="text-sm text-muted">{member.email}</p>
                  <p className="text-sm text-muted">{member.businessName}</p>
                  <p className="text-xs text-muted mt-1">{member.industryType}</p>
                </div>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}
              >
                {member.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">Created: {member.createdAt}</p>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 text-muted hover:text-accent transition-colors touch-manipulation"
                  onClick={() => {
                    setEditingStaff(member);
                    setIsCreateModalOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button className="p-2 text-muted hover:text-danger transition-colors touch-manipulation">
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
                Business Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {filteredStaff.map((member) => (
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
                    <div className="text-sm text-primary">{member.businessName}</div>
                    <div className="text-xs text-muted">{member.industryType}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{member.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-muted hover:text-accent transition-colors touch-manipulation"
                      onClick={() => {
                        setEditingStaff(member);
                        setIsCreateModalOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button className="p-1 text-muted hover:text-danger transition-colors touch-manipulation">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">
            {searchTerm
              ? "No staff members found matching your criteria."
              : "No staff members found. Add your first staff member to get started."}
          </p>
        </div>
      )}

      <CreateStaffModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingStaff(null);
        }}
        onCreate={handleCreateStaff}
        initialData={editingStaff}
      />

    </div>
  )
}
