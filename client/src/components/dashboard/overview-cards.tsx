"use client";

import {
  Package,
  Grid3X3,
  AlertTriangle,
  XCircle,
  Database,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";

type ColorType = "accent" | "green" | "yellow" | "red" | "blue";

const colorClasses: Record<ColorType, string> = {
  accent: "bg-accent/20 text-accent",
  green: "bg-green-500/20 text-green-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  red: "bg-red-500/20 text-red-400",
  blue: "bg-blue-500/20 text-blue-400",
};

export default function OverviewCards() {
  const { dashboardData, isLoading } = useDashboardStore();

  interface Card {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: ColorType;
  }

  const cards: Card[] = [
    {
      title: "Total Stocks",
      value: dashboardData.totalStocks.toString(),
      icon: Database,
      color: "blue",
    },
    {
      title: "Total Products",
      value: dashboardData.totalProducts.toString(),
      icon: Package,
      color: "accent",
    },
    {
      title: "Categories",
      value: dashboardData.totalCategories.toString(),
      icon: Grid3X3,
      color: "green",
    },

    {
      title: "Low Stock",
      value: dashboardData.lowStock.toString(),
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      title: "Out of Stock",
      value: dashboardData.outOfStock.toString(),
      icon: XCircle,
      color: "red",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-custom animate-pulse"
          >
            <div className="flex items-center gap-8 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mobile-grid">
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
              <h3 className="text-lg sm:text-2xl font-bold text-primary mb-1">
                {card.value}
              </h3>
              <p className="text-muted text-sm">{card.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
