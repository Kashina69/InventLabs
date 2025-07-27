"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import StaffLayout from "@/components/layout/staff-layout"
const inventoryTrends = [
  { month: "Jan", total: 1200, inbound: 150, outbound: 120 },
  { month: "Feb", total: 1180, inbound: 180, outbound: 200 },
  { month: "Mar", total: 1250, inbound: 220, outbound: 150 },
  { month: "Apr", total: 1300, inbound: 200, outbound: 150 },
  { month: "May", total: 1280, inbound: 160, outbound: 180 },
  { month: "Jun", total: 1320, inbound: 240, outbound: 200 },
]

const lowStockStats = [
  { category: "Electronics", count: 8 },
  { category: "Clothing", count: 5 },
  { category: "Footwear", count: 3 },
  { category: "Home & Garden", count: 2 },
]

const topMovingItems = [
  { name: "iPhone 14 Pro", moved: 145 },
  { name: "Samsung Galaxy S23", moved: 120 },
  { name: "MacBook Air M2", moved: 98 },
  { name: 'iPad Pro 11"', moved: 87 },
  { name: "AirPods Pro", moved: 76 },
]

const stockDistribution = [
  { name: "In Stock", value: 75, color: "#10b981" },
  { name: "Low Stock", value: 20, color: "#f59e0b" },
  { name: "Out of Stock", value: 5, color: "#ef4444" },
]

export default function ReportsCharts() {
  return (
    <StaffLayout>
    <div className="space-y-8">
      {/* Inventory Trends */}
      <div className="bg-surface rounded-2xl p-6 border border-custom">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary">Inventory Trends</h2>
          <p className="text-muted text-sm">Monthly inventory movement over time</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={inventoryTrends} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text)" fontSize={12} />
              <YAxis stroke="var(--text)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                }}
              />
              <Line type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={3} name="Total Stock" />
              <Line type="monotone" dataKey="inbound" stroke="#10b981" strokeWidth={2} name="Inbound" />
              <Line type="monotone" dataKey="outbound" stroke="#ef4444" strokeWidth={2} name="Outbound" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock by Category */}
        <div className="bg-surface rounded-2xl p-6 border border-custom">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary">Low Stock by Category</h2>
            <p className="text-muted text-sm">Items below threshold by category</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lowStockStats} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--text)" fontSize={12} />
                <YAxis stroke="var(--text)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text)",
                  }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Distribution */}
        <div className="bg-surface rounded-2xl p-6 border border-custom">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary">Stock Distribution</h2>
            <p className="text-muted text-sm">Overall stock status breakdown</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-4 text-sm">
              {stockDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Moving Items */}
      {/* <div className="bg-surface rounded-2xl p-6 border border-custom">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary">Top Moving Items</h2>
          <p className="text-muted text-sm">Most frequently moved products this month</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topMovingItems} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--text)" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="var(--text)" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                }}
              />
              <Bar dataKey="moved" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </div>
    </StaffLayout>
  )
}
