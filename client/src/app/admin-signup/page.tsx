"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, UserPlus, Package, Building, StarIcon as Industry, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const industryTypes = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Education",
  "Food & Beverage",
  "Automotive",
  "Construction",
  "Real Estate",
  "Entertainment",
  "Other",
]

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    industryType: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { registerAdmin, isLoading } = useAuth()

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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

    try {
      await registerAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        industryType: formData.industryType,
      })
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Registration failed" })
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 safe-area-inset">
      <div className="bg-surface border border-custom rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">Create Admin Account</h1>
          <p className="text-muted text-sm">Set up your business inventory management system</p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary border-b border-custom pb-2">
              <User className="w-4 h-4" />
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
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.name ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
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
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.email ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.password ? "border-danger bg-danger/10" : "border-custom"
                    }`}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors touch-manipulation"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-danger">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.confirmPassword ? "border-danger bg-danger/10" : "border-custom"
                    }`}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors touch-manipulation"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-danger">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary border-b border-custom pb-2">
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
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.businessName ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter your business name"
                required
                disabled={isLoading}
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.industryType ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select your industry type</option>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 px-6 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors touch-manipulation flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Create Admin Account</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
