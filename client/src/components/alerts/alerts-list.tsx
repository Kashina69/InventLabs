"use client"

import { AlertTriangle, XCircle, Package } from "lucide-react"

const alertsData = [
  {
    id: 1,
    product: "iPhone 14 Pro",
    sku: "IPH14P-128-BLK",
    category: "Electronics",
    currentStock: 5,
    threshold: 10,
    status: "Low Stock",
    severity: "medium",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    product: "Samsung Galaxy S23",
    sku: "SGS23-256-WHT",
    category: "Electronics",
    currentStock: 3,
    threshold: 15,
    status: "Low Stock",
    severity: "high",
    lastUpdated: "4 hours ago",
  },
  {
    id: 3,
    product: "MacBook Air M2",
    sku: "MBA-M2-512-SLV",
    category: "Electronics",
    currentStock: 0,
    threshold: 8,
    status: "Out of Stock",
    severity: "critical",
    lastUpdated: "6 hours ago",
  },
  {
    id: 4,
    product: 'iPad Pro 11"',
    sku: "IPD11P-256-GRY",
    category: "Electronics",
    currentStock: 7,
    threshold: 12,
    status: "Low Stock",
    severity: "medium",
    lastUpdated: "8 hours ago",
  },
  {
    id: 5,
    product: "AirPods Pro",
    sku: "APP-2ND-WHT",
    category: "Electronics",
    currentStock: 0,
    threshold: 20,
    status: "Out of Stock",
    severity: "critical",
    lastUpdated: "1 day ago",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <XCircle className="w-5 h-5 text-red-400" />
    case "high":
    case "medium":
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />
    default:
      return <Package className="w-5 h-5 text-gray-400" />
  }
}

export default function AlertsList() {
  const criticalAlerts = alertsData.filter((alert) => alert.severity === "critical")
  const otherAlerts = alertsData.filter((alert) => alert.severity !== "critical")

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="bg-surface rounded-2xl border border-custom">
          <div className="p-6 border-b border-custom">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <h2 className="text-xl font-semibold text-primary">Critical Alerts</h2>
                <p className="text-muted text-sm">Items that require immediate attention</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1">
                        <h3 className="font-medium text-primary">{alert.product}</h3>
                        <p className="text-sm text-muted">
                          {alert.sku} • {alert.category}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-primary">
                            Current: <span className="font-medium">{alert.currentStock}</span>
                          </span>
                          <span className="text-muted">
                            Threshold: <span className="font-medium">{alert.threshold}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          alert.status === "Out of Stock"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {alert.status}
                      </span>
                      <p className="text-xs text-muted mt-1">{alert.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Alerts */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Low Stock Alerts</h2>
              <p className="text-muted text-sm">Items approaching minimum threshold</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {otherAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <h3 className="font-medium text-primary">{alert.product}</h3>
                      <p className="text-sm text-muted">
                        {alert.sku} • {alert.category}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="text-primary">
                          Current: <span className="font-medium">{alert.currentStock}</span>
                        </span>
                        <span className="text-muted">
                          Threshold: <span className="font-medium">{alert.threshold}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                      {alert.status}
                    </span>
                    <p className="text-xs text-muted mt-1">{alert.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
