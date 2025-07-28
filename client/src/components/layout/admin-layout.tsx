"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import { useAuthStore } from "@/store/auth";
import { jwtUtils } from "@/utils/jwt";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, isAuthenticated, initializeAuth } = useAuthStore();
  const router = useRouter();

  // Initialize authentication on component mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Protect admin routes
  useEffect(() => {
    if (!isLoading) {
      // Check if user is authenticated and has admin role
      console.log(
        isAuthenticated,
        jwtUtils.isAuthenticated(),
        user,
        user?.role !== "ADMIN"
      );
      if (
        !isAuthenticated ||
        !jwtUtils.isAuthenticated() ||
        !user ||
        user?.role !== "ADMIN"
      ) {
        // router.push("/login");
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto mobile-container safe-area-inset">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
