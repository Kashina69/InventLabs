"use client"

import { useState, useEffect } from "react"
import { Save, User, Edit, RefreshCw, XCircle } from "lucide-react"
import { useUserStore } from "../../store/user"

export default function SettingsPanel() {
  const { user, loading, error, fetchUser, updateUser } = useUserStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    currentPassword: "",
  })
  const [isUpdating, setIsUpdating] = useState(false)

  // Load user data when component mounts
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: "",
        currentPassword: "",
      })
    }
  }, [user])

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters."
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter."
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter."
    if (!/[0-9]/.test(password)) return "Include at least one number."
    if (!/[!@#$%^&*]/.test(password)) return "Include at least one special character."
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    // Validate password if it's being changed
    if (formData.password && formData.password.length > 0) {
      const passwordError = validatePassword(formData.password)
      if (passwordError) {
        alert(`Error: ${passwordError}`)
        return
      }
      
      if (!formData.currentPassword) {
        alert("Please enter your current password to change your password.")
        return
      }
    }

    setIsUpdating(true)
    
    try {
      // Prepare update data - only include fields that have values
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }

      // Only include password fields if password is being changed
      if (formData.password && formData.currentPassword) {
        updateData.password = formData.password
        updateData.currentPassword = formData.currentPassword
      }

      await updateUser(updateData)
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: "",
        currentPassword: ""
      }))
      
      fetchUser()
    } catch (error) {
      console.error("Error updating settings:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2 text-muted">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
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
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Password Update */}
      <div className="bg-surface rounded-2xl border border-custom">
        <div className="p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-accent" />
            <div>
              <h2 className="text-xl font-semibold text-primary">Update Password</h2>
              <p className="text-muted text-sm">Change your account password</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">New Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isUpdating ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  )
}
