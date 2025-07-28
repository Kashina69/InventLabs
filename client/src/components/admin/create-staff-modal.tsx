"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, UserPlus, Building, StarIcon as Industry, Eye, EyeOff } from "lucide-react"
import { useAuthStore } from "@/store/auth"

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

const staffSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  industryType: z.string().min(1, "Please select an industry type"),
})

type StaffForm = z.infer<typeof staffSchema>

export default function CreateStaffModal({ isOpen, onClose, onCreate }: CreateStaffModalProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const { isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      businessName: "",
      industryType: "",
    },
  })

  const onSubmit = async (data: StaffForm) => {
    try {
      // For now, we'll just call the onCreate callback since the API endpoint might be different
      onCreate(data)
      reset()
      onClose()
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Failed to create staff account",
      })
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      reset()
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
            disabled={isLoading}
            className="p-2 text-muted hover:text-primary transition-colors touch-manipulation disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {errors.root && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
              {errors.root.message}
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
                  {...register("name")}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.name ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter full name"
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-sm text-danger">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email Address *</label>
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.email ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter email address"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Password *</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.password ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Create a password"
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
              {errors.password && <p className="mt-1 text-sm text-danger">{errors.password.message}</p>}
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
                {...register("businessName")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                  errors.businessName ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter business name"
                disabled={isLoading}
              />
              {errors.businessName && <p className="mt-1 text-sm text-danger">{errors.businessName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Industry Type *</label>
              <div className="relative">
                <Industry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <select
                  {...register("industryType")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                    errors.industryType ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Select industry type</option>
                  {industryTypes.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              {errors.industryType && <p className="mt-1 text-sm text-danger">{errors.industryType.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-custom bg-background text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-accent text-white px-4 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
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
