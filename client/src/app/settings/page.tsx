"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import SettingsPanel from "@/components/settings/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Settings</h1>
          <p className="text-muted">Configure your application preferences</p>
        </div>
        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}
