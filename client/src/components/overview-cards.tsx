"use client"

import { Package, Grid3X3, AlertTriangle, XCircle } from "lucide-react"

const cards = [
  {
    title: "Total Products",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Package,
    color: "blue",
  },
  {
    title: "Categories",
    value: "24",
    change: "+2",
    changeType: "positive",
    icon: Grid3X3,
    color: "green",
  },
  {
    title: "Low Stock",
    value: "18",
    change: "-5",
    changeType: "negative",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    title: "Out of Stock",
    value: "3",
    change: "+1",
    changeType: "negative",
    icon: XCircle,
    color: "red",
  },
]

const colorClasses = {
  blue: "bg-violet-500/20 text-violet-400",
  green: "bg-green-500/20 text-green-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  red: "bg-red-500/20 text-red-400",
}

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[card.color]}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                card.changeType === "positive" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
              }`}
            >
              {card.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#E5E5E5] mb-1">{card.value}</h3>
          <p className="text-gray-400 text-sm">{card.title}</p>
        </div>
      ))}
    </div>
  )
}
