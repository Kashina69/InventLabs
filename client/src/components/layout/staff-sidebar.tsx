"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, ClipboardList, LogOut, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface StaffSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Products", href: "/staff/dashboard", icon: Package },
  { name: "Restock Requests", href: "/staff/restock-requests", icon: ClipboardList },
]

export default function StaffSidebar({ isOpen, onClose }: StaffSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

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
              <span className="text-lg font-semibold text-primary">Staff Portal</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-muted hover:text-primary transition-colors touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-custom">
            <p className="text-sm font-medium text-primary">{user?.name}</p>
            <p className="text-xs text-muted">{user?.email}</p>
            <div className="mt-2 inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-md">Staff Account</div>
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

          {/* Logout */}
          <div className="px-3 py-4 border-t border-custom">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors touch-manipulation"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
