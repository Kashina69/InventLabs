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
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#E5E5E5]">Stock Trends</h2>
          <p className="text-gray-400 text-sm">Monthly inventory movement</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Total Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400">Outbound</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#303136" />
            <XAxis dataKey="month" stroke="#E5E5E5" fontSize={12} />
            <YAxis stroke="#E5E5E5" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                color: "#e2e8f0",
              }}
            />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="inbound"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="outbound"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
