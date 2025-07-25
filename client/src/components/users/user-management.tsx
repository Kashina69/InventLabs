"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, MoreHorizontal, User, Shield } from "lucide-react"

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
    joinDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2024-01-15 09:15 AM",
    joinDate: "2023-08-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2024-01-14 03:45 PM",
    joinDate: "2023-09-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Staff",
    status: "Inactive",
    lastLogin: "2024-01-10 11:20 AM",
    joinDate: "2023-11-05",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-13 02:10 PM",
    joinDate: "2023-05-30",
  },
]

const roles = ["All Roles", "Admin", "Staff"]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "All Roles" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="w-4 h-4 text-accent" />
      case "Staff":
        return <User className="w-4 h-4 text-blue-400" />
      default:
        return <User className="w-4 h-4 text-gray-400" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-accent/20 text-accent"
      case "Staff":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
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
    <div className="space-y-6">
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-primary">User Management</h2>
              <p className="text-muted text-sm">Manage user accounts and permissions</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-64"
                />
              </div>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-custom">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-primary">{user.name}</div>
                        <div className="text-sm text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-muted hover:text-accent transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted hover:text-danger transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted hover:text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
