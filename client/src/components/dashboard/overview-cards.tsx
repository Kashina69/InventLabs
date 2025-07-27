"use client"

import { Package, Grid3X3, AlertTriangle, XCircle } from "lucide-react"

const cards = [
  {
    title: "Total Products",
    value: "1,247",
    changeType: "positive",
    icon: Package,
    color: "accent",
  },
  {
    title: "Categories",
    value: "24",
    changeType: "positive",
    icon: Grid3X3,
    color: "green",
  },
  {
    title: "Low Stock",
    value: "18",
    changeType: "negative",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    title: "Out of Stock",
    value: "3",
    changeType: "negative",
    icon: XCircle,
    color: "red",
  },
]

const colorClasses = {
  accent: "bg-accent/20 text-accent",
  green: "bg-green-500/20 text-green-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  red: "bg-red-500/20 text-red-400",
}

export default function OverviewCards() {
  return (
    // <div className="mobile-grid ">
    //   {cards.map((card, index) => (
    //     <div
    //       key={index}
    //       className="bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-custom hover:shadow-lg hover:shadow-accent/10 transition-all"
    //     >
    //       <div className="flex items-center justify-around mb-3 sm:mb-4">
    //         <div
    //           className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${colorClasses[card.color]}`}
    //         >
    //           <card.icon className="w-6 h-6 sm:w-6 sm:h-6" />
    //         </div>
    //         {/* <span
    //           className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
    //             card.changeType === "positive" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
    //           }`}
    //         >
    //           {card.change}
    //         </span> */}
          
    //       <div>
    //       <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1">{card.value}</h3>
    //       <p className="text-muted text-xs sm:text-sm">{card.title}</p>
    //       </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-grid">
  {cards.map((card, index) => (
    <div
      key={index}
      className="bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-custom hover:shadow-lg hover:shadow-accent/10 transition-all"
    >
      <div className="flex items-center gap-8 mb-3 sm:mb-4">
        {/* Icon Container */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${colorClasses[card.color]}`}
        >
          <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-lg sm:text-2xl font-bold text-primary mb-1">{card.value}</h3>
          <p className="text-muted text-sm">{card.title}</p>
        </div>
      </div>

      {/* Optional Change Badge (uncomment if needed) */}
      {/* <span
        className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
          card.changeType === "positive"
            ? "text-green-700 bg-green-100"
            : "text-red-700 bg-red-100"
        }`}
      >
        {card.change}
      </span> */}
    </div>
  ))}
</div>

  )
}
