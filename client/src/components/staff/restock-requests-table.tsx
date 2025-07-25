"use client"

import { useState } from "react"
import { Search, Filter, Clock, CheckCircle, XCircle } from "lucide-react"

// Placeholder data
const restockRequestsData = [
  {
    id: 1,
    productName: "iPhone 14 Pro",
    sku: "IPH14P-128-BLK",
    quantityRequested: 20,
    requestDate: "2024-01-15",
    status: "Pending",
    notes: "Running low on black models",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S23",
    sku: "SGS23-256-WHT",
    quantityRequested: 15,
    requestDate: "2024-01-14",
    status: "Approved",
    notes: "Urgent restock needed",
  },
  {
    id: 3,
    productName: "MacBook Air M2",
    sku: "MBA-M2-512-SLV",
    quantityRequested: 10,
    requestDate: "2024-01-13",
    status: "Rejected",
    notes: "New model coming soon",
  },
  {
    id: 4,
    productName: "AirPods Pro",
    sku: "APP-2ND-WHT",
    quantityRequested: 30,
    requestDate: "2024-01-12",
    status: "Pending",
    notes: "High demand expected",
  },
]

const statusOptions = ["All Statuses", "Pending", "Approved", "Rejected"]

export default function RestockRequestsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredData = restockRequestsData.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Statuses" || item.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "Approved":
        return "bg-green-500/20 text-green-400"
      case "Rejected":
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
              <h2 className="text-lg sm:text-xl font-semibold text-primary">Restock Requests</h2>
              <p className="text-muted text-sm">View your submitted restock requests</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-custom bg-background text-primary rounded-lg hover:bg-surface transition-colors touch-manipulation w-full sm:w-auto"
              >
                <Filter className="w-4 h-4" />
                <span className="sm:hidden">Filter by Status</span>
                <span className="hidden sm:inline">Filter</span>
              </button>

              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute right-0 mt-2 w-full sm:w-48 bg-surface rounded-lg shadow-lg border border-custom py-2 z-50">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status)
                          setIsFilterOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-background transition-colors touch-manipulation ${
                          selectedStatus === status ? "bg-accent/20 text-accent" : "text-primary"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        {filteredData.map((item) => (
          <div key={item.id} className="p-4 border-b border-custom last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-primary">{item.productName}</h3>
                <p className="text-sm text-muted">{item.sku}</p>
                <p className="text-sm text-muted">Quantity: {item.quantityRequested}</p>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(item.status)}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted">Requested on: {item.requestDate}</p>
              {item.notes && <p className="text-xs text-muted">Notes: {item.notes}</p>}
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
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Quantity Requested
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Request Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-primary">{item.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-primary">{item.quantityRequested}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.requestDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No restock requests found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
