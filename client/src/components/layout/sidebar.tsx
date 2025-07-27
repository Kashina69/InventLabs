"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Plus,
  FileText,
  BarChart3,
  AlertTriangle,
  Users,
  Settings,
  X,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Update the navigation array to include Staff Management
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Categories", href: "/categories", icon: Grid3X3 },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Staff Management", href: "/admin/staff-management", icon: Users },
  { name: "Inventory Logs", href: "/logs", icon: FileText },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-surface border-r border-custom transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-custom flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-primary">Inventory</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-muted hover:text-primary transition-colors touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                      isActive ? "bg-accent text-white" : "text-muted hover:text-primary hover:bg-background"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
