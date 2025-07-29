"use client";

import { useState } from "react";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <header className="h-16 bg-surface border-b border-custom flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-muted hover:text-primary transition-colors touch-manipulation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-primary">Dashboard</h1>
          {user?.businessName && (
            <p className="text-xs text-muted">
              {user.businessName} • {user.industryType}
            </p>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/alerts"
          className="p-2 text-[#E5E5E5] hover:text-[#7C3AED] transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </Link>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 text-muted hover:text-primary transition-colors touch-manipulation"
          >
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-primary">{user?.name}</p>
              <p className="text-xs text-muted capitalize">{user?.role}</p>
            </div>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-custom rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-custom">
                <p className="text-sm font-medium text-primary">{user?.name}</p>
                <p className="text-xs text-muted">{user?.email}</p>
                {user?.businessName && (
                  <p className="text-xs text-muted mt-1">{user.businessName}</p>
                )}
              </div>
              <div className="py-2">
                <Link
                  href="/settings"
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:text-danger hover:bg-background transition-colors "
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}
