"use client"

import { useState } from "react"
import { Search, Filter, Calendar, ArrowUp, ArrowDown, ArrowRight, Package } from "lucide-react"

const logsData = [
  {
    id: 1,
    product: "iPhone 14 Pro",
    sku: "IPH14P-128-BLK",
    action: "Added",
    quantity: 50,
    user: "John Doe",
    date: "2024-01-15",
    time: "10:30 AM",
    type: "in",
    notes: "New stock arrival",
  },
  {
    id: 2,
    product: "Samsung Galaxy S23",
    sku: "SGS23-256-WHT",
    action: "Removed",
    quantity: 15,
    user: "Jane Smith",
    date: "2024-01-15",
    time: "09:15 AM",
    type: "out",
    notes: "Customer order fulfillment",
  },
  {
    id: 3,
    product: "MacBook Air M2",
    sku: "MBA-M2-512-SLV",
    action: "Transferred",
    quantity: 5,
    user: "Mike Johnson",
    date: "2024-01-14",
    time: "03:45 PM",
    type: "transfer",
    notes: "Moved to warehouse B",
  },
  {
    id: 4,
    product: 'iPad Pro 11"',
    sku: "IPD11P-256-GRY",
    action: "Added",
    quantity: 25,
    user: "Sarah Wilson",
    date: "2024-01-14",
    time: "11:20 AM",
    type: "in",
    notes: "Restocking",
  },
  {
    id: 5,
    product: "AirPods Pro",
    sku: "APP-2ND-WHT",
    action: "Removed",
    quantity: 10,
    user: "Tom Brown",
    date: "2024-01-13",
    time: "02:10 PM",
    type: "out",
    notes: "Damaged items removed",
  },
]

const actionTypes = ["All Actions", "Added", "Removed", "Transferred"]

export default function InventoryLogsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAction, setSelectedAction] = useState("All Actions")
  const [selectedDate, setSelectedDate] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredData = logsData.filter((log) => {
    const matchesSearch =
      log.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = selectedAction === "All Actions" || log.action === selectedAction
    const matchesDate = !selectedDate || log.date === selectedDate
    return matchesSearch && matchesAction && matchesDate
  })

  const getActionIcon = (type: string) => {
    switch (type) {
      case "in":
        return <ArrowUp className="w-4 h-4 text-green-400" />
      case "out":
        return <ArrowDown className="w-4 h-4 text-red-400" />
      case "transfer":
        return <ArrowRight className="w-4 h-4 text-blue-400" />
      default:
        return <ArrowUp className="w-4 h-4 text-gray-400" />
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case "in":
        return "bg-green-500/20 text-green-400"
      case "out":
        return "bg-red-500/20 text-red-400"
      case "transfer":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="bg-surface rounded-2xl border border-custom">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-custom">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold text-primary">Inventory Logs</h2>
            <p className="text-muted text-sm">Track all inventory movements and changes</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search - Full width on mobile */}
            <div className="relative flex-1 sm:max-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Date and Filter - Side by side on mobile */}
            <div className="flex gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-custom bg-background text-primary rounded-lg hover:bg-surface transition-colors whitespace-nowrap"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-custom py-2 z-10">
                    {actionTypes.map((action) => (
                      <button
                        key={action}
                        onClick={() => {
                          setSelectedAction(action)
                          setIsFilterOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-background transition-colors ${
                          selectedAction === action ? "bg-accent/20 text-accent" : "text-primary"
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {filteredData.map((log) => (
              <tr key={log.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-primary">{log.product}</div>
                    <div className="text-sm text-muted">{log.sku}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getActionIcon(log.type)}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.type)}`}
                    >
                      {log.action}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-primary">{log.quantity}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{log.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary">{log.date}</div>
                  <div className="text-xs text-muted">{log.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-custom">
          {filteredData.map((log) => (
            <div key={log.id} className="p-4 hover:bg-background transition-colors">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-primary truncate">{log.product}</h3>
                  <p className="text-sm text-muted">{log.sku}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {getActionIcon(log.type)}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.type)}`}
                  >
                    {log.action}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <span className="text-muted">Quantity:</span>
                  <span className="ml-2 font-medium text-primary">{log.quantity}</span>
                </div>
                <div>
                  <span className="text-muted">User:</span>
                  <span className="ml-2 text-primary">{log.user}</span>
                </div>
                <div>
                  <span className="text-muted">Date:</span>
                  <span className="ml-2 text-primary">{log.date}</span>
                </div>
                <div>
                  <span className="text-muted">Time:</span>
                  <span className="ml-2 text-primary">{log.time}</span>
                </div>
              </div>

              {/* Notes */}
              {log.notes && (
                <div className="pt-3 border-t border-custom">
                  <span className="text-muted text-sm">Notes:</span>
                  <p className="text-sm text-primary mt-1">{log.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tablet Horizontal Scroll View */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {filteredData.map((log) => (
              <tr key={log.id} className="hover:bg-background transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-primary text-sm">{log.product}</div>
                    <div className="text-xs text-muted">{log.sku}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getActionIcon(log.type)}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.type)}`}
                    >
                      {log.action}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-primary">{log.quantity}</span>
                </td>
                <td className="px-4 py-3 text-sm text-muted">{log.user}</td>
                <td className="px-4 py-3">
                  <div className="text-sm text-primary">{log.date}</div>
                  <div className="text-xs text-muted">{log.time}</div>
                </td>
                <td className="px-4 py-3 text-sm text-muted max-w-32 truncate">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted mb-4" />
          <p className="text-muted">No logs found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
