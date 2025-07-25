"use client"

import { useState } from "react"
import { Save, User, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    globalThreshold: "10",
    darkMode: true,
    notifications: {
      email: true,
      push: true,
      lowStock: true,
      outOfStock: true,
    },
    profile: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      timezone: "UTC-5",
    },
  })

  const handleSave = () => {
    console.log("Settings saved:", settings)
    // Handle save logic
  }

  const handleProfileChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-accent" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Profile Settings</h2>
              <p className="text-muted text-sm">Manage your personal information</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <input
                type="email"
                value={settings.profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Phone</label>
              <input
                type="tel"
                value={settings.profile.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Timezone</label>
              <select
                value={settings.profile.timezone}
                onChange={(e) => handleProfileChange("timezone", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Settings */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Inventory Settings</h2>
              <p className="text-muted text-sm">Configure inventory management preferences</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Global Low Stock Threshold</label>
            <input
              type="number"
              value={settings.globalThreshold}
              onChange={(e) => setSettings((prev) => ({ ...prev, globalThreshold: e.target.value }))}
              className="w-full max-w-xs px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              min="0"
            />
            <p className="text-sm text-muted mt-1">Default threshold for new products</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-accent" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Notification Settings</h2>
              <p className="text-muted text-sm">Choose how you want to be notified</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-primary">Email Notifications</h3>
                <p className="text-sm text-muted">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleNotificationChange("email", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-primary">Push Notifications</h3>
                <p className="text-sm text-muted">Receive push notifications in browser</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleNotificationChange("push", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-primary">Low Stock Alerts</h3>
                <p className="text-sm text-muted">Get notified when items are running low</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.lowStock}
                  onChange={(e) => handleNotificationChange("lowStock", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-primary">Out of Stock Alerts</h3>
                <p className="text-sm text-muted">Get notified when items are out of stock</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.outOfStock}
                  onChange={(e) => handleNotificationChange("outOfStock", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-accent" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Appearance</h2>
              <p className="text-muted text-sm">Customize the look and feel</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary">Dark Mode</h3>
              <p className="text-sm text-muted">Use dark theme for better visibility</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings((prev) => ({ ...prev, darkMode: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
