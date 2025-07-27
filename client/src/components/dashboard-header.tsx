"use client"

import { useState } from "react"
import { Bell, Search, User, Settings, LogOut, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-[#E5E5E5]">Inventory Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/add-product"
              className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>

            <button className="p-2 text-[#E5E5E5] hover:text-[#7C3AED] transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 text-[#E5E5E5] hover:text-[#7C3AED] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#303136] transition-colors"
              >
                <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[#E5E5E5] hidden sm:block">John Doe</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-700">
                    <p className="text-sm font-medium text-slate-100">John Doe</p>
                    <p className="text-xs text-slate-400">john@example.com</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-slate-700 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
