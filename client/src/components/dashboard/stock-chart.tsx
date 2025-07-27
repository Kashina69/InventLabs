"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", stock: 1200, inbound: 150, outbound: 120 },
  { month: "Feb", stock: 1180, inbound: 180, outbound: 200 },
  { month: "Mar", stock: 1250, inbound: 220, outbound: 150 },
  { month: "Apr", stock: 1300, inbound: 200, outbound: 150 },
  { month: "May", stock: 1280, inbound: 160, outbound: 180 },
  { month: "Jun", stock: 1320, inbound: 240, outbound: 200 },
]

export default function StockChart() {
  return (
    <div className="bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-custom">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-primary">Stock Trends</h2>
          <p className="text-muted text-sm">Monthly inventory movement</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted">Total Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-muted">Outbound</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--text)" fontSize={10} />
            <YAxis stroke="var(--text)" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="inbound"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="outbound"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
