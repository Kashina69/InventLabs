"use client"

import type React from "react"

import { useState } from "react"
import { X, UserPlus, Building, StarIcon as Industry } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface CreateStaffModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (staffData: any) => void
}

const industryTypes = [
  "Technology",
  "Retail",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Education",
  "Food & Beverage",
  "Automotive",
  "Construction",
  "Real Estate",
  "Entertainment",
  "Other",
]

export default function CreateStaffModal({ isOpen, onClose, onCreate }: CreateStaffModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    industryType: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { createStaffAccount } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }

    if (!formData.industryType) {
      newErrors.industryType = "Industry type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await createStaffAccount(formData)

      // Call the parent's onCreate function to update the local state
      onCreate(formData)

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        businessName: "",
        industryType: "",
      })
      setErrors({})
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        password: "",
        businessName: "",
        industryType: "",
      })
      setErrors({})
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl border border-custom w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Add Staff Member</h2>
              <p className="text-sm text-muted">Create a new staff account with business information</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-muted hover:text-primary transition-colors touch-manipulation disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.submit && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
              {errors.submit}
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <UserPlus className="w-4 h-4" />
              Personal Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.name ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="mt-1 text-sm text-danger">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.email ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                  errors.password ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Create a password"
                minLength={8}
              />
              {errors.password && <p className="mt-1 text-sm text-danger">{errors.password}</p>}
              <p className="mt-1 text-xs text-muted">Password must be at least 8 characters</p>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4 pt-4 border-t border-custom">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Building className="w-4 h-4" />
              Business Information
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                  errors.businessName ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter business name"
              />
              {errors.businessName && <p className="mt-1 text-sm text-danger">{errors.businessName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Industry Type *</label>
              <div className="relative">
                <Industry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.industryType ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                >
                  <option value="">Select industry type</option>
                  {industryTypes.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              {errors.industryType && <p className="mt-1 text-sm text-danger">{errors.industryType}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-custom bg-background text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent text-white px-4 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Staff Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
