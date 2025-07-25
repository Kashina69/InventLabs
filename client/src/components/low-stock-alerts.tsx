"use client"

import { AlertTriangle } from "lucide-react"

const lowStockItems = [
  { name: "iPhone 14 Pro", quantity: 5, threshold: 10 },
  { name: "Samsung Galaxy S23", quantity: 3, threshold: 15 },
  { name: "MacBook Air M2", quantity: 2, threshold: 8 },
  { name: 'iPad Pro 11"', quantity: 7, threshold: 12 },
  { name: "AirPods Pro", quantity: 4, threshold: 20 },
]

export default function LowStockAlerts() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#E5E5E5]">Low Stock Alerts</h2>
          <p className="text-gray-400 text-sm">Items below threshold</p>
        </div>
      </div>

      <div className="space-y-4">
        {lowStockItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-[#E5E5E5] text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">Threshold: {item.threshold}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-400">{item.quantity}</p>
              <p className="text-xs text-gray-500">in stock</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium transition-colors">
        View All Alerts
      </button>
    </div>
  )
}
