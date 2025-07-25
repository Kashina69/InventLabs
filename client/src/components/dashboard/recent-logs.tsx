"use client"

import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react"

const recentLogs = [
  {
    id: 1,
    product: "iPhone 14 Pro",
    action: "Added",
    quantity: 50,
    user: "John Doe",
    timestamp: "2 hours ago",
    type: "in",
  },
  {
    id: 2,
    product: "Samsung Galaxy S23",
    action: "Removed",
    quantity: 15,
    user: "Jane Smith",
    timestamp: "4 hours ago",
    type: "out",
  },
  {
    id: 3,
    product: "MacBook Air M2",
    action: "Transferred",
    quantity: 5,
    user: "Mike Johnson",
    timestamp: "6 hours ago",
    type: "transfer",
  },
  {
    id: 4,
    product: 'iPad Pro 11"',
    action: "Added",
    quantity: 25,
    user: "Sarah Wilson",
    timestamp: "8 hours ago",
    type: "in",
  },
  {
    id: 5,
    product: "AirPods Pro",
    action: "Removed",
    quantity: 10,
    user: "Tom Brown",
    timestamp: "1 day ago",
    type: "out",
  },
]

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
      return "text-green-400"
    case "out":
      return "text-red-400"
    case "transfer":
      return "text-blue-400"
    default:
      return "text-gray-400"
  }
}

export default function RecentLogs() {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-custom">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary">Recent Activity</h2>
          <p className="text-muted text-sm">Latest inventory movements</p>
        </div>
        <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">View All</button>
      </div>

      <div className="space-y-4">
        {recentLogs.map((log) => (
          <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-background transition-colors">
            <div className="flex-shrink-0">{getActionIcon(log.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{log.product}</p>
              <p className="text-xs text-muted">
                <span className={getActionColor(log.type)}>{log.action}</span> {log.quantity} units by {log.user}
              </p>
            </div>
            <div className="text-xs text-muted text-right">{log.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
