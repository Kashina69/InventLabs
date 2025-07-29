"use client";

import type React from "react";
import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
