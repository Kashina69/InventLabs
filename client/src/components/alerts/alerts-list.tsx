"use client"

import { AlertTriangle, XCircle, Package, RefreshCw } from "lucide-react"
import { useEffect } from "react"
import { useAlertsStore } from "../../store/alerts"
import { getTimeAgo } from "../../utils/timeUtils"



export default function AlertsList() {
  const { outOfStock, lowStock, loading, error, fetchAlerts } = useAlertsStore()

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2 text-muted">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading alerts...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Out of Stock Alerts */}
      {outOfStock.length > 0 && (
        <div className="bg-surface rounded-2xl border border-custom">
          <div className="p-6 border-b border-custom">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <h2 className="text-xl font-semibold text-primary">Out of Stock Alerts</h2>
                <p className="text-muted text-sm">Items that require immediate attention</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {outOfStock.map((alert, index) => (
                <div key={`${alert.sku}-${index}`} className="p-4 rounded-xl border bg-red-500/20 text-red-400 border-red-500/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary">{alert.name}</h3>
                        <p className="text-sm text-muted">
                          {alert.sku} • {alert.categoryName}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-primary">
                            Current: <span className="font-medium">{alert.stock}</span>
                          </span>
                          <span className="text-muted">
                            Threshold: <span className="font-medium">{alert.threshold}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex py-2 pr-4 pl-4 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
                        {alert.status}
                      </span>
                      <p className="text-xs text-muted mt-1">{getTimeAgo(alert.lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
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
              {lowStock.map((alert, index) => (
                <div key={`${alert.sku}-${index}`} className="p-4 rounded-xl border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary">{alert.name}</h3>
                        <p className="text-sm text-muted">
                          {alert.sku} • {alert.categoryName}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-primary">
                            Current: <span className="font-medium">{alert.stock}</span>
                          </span>
                          <span className="text-muted">
                            Threshold: <span className="font-medium">{alert.threshold}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-4 py-2 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                        {alert.status}
                      </span>
                      <p className="text-xs text-muted mt-1">{getTimeAgo(alert.lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Alerts */}
      {outOfStock.length === 0 && lowStock.length === 0 && (
        <div className="bg-surface rounded-2xl border border-custom p-8">
          <div className="text-center">
            <Package className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary mb-2">No Alerts</h3>
            <p className="text-muted">All products are within their stock thresholds.</p>
          </div>
        </div>
      )}
    </div>
  )
}
