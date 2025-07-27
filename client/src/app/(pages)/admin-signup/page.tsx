"use client"

import React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

const adminSignupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string(),
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(100, "Business name must be less than 100 characters"),
    industryType: z.string().min(1, "Please select an industry type"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type AdminSignupForm = z.infer<typeof adminSignupSchema>

export default function AdminSignup() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const { registerAdmin, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdminSignupForm>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      industryType: "",
    },
  })

  const onSubmit = async (data: AdminSignupForm) => {
    try {
      await registerAdmin({
        name: data.name,
        email: data.email,
        password: data.password,
        businessName: data.businessName,
        industryType: data.industryType,
      })
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Registration failed",
      })
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

        {errors.root && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {...register("name")}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.name ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-sm text-danger">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email Address *</label>
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.email ? "border-danger bg-danger/10" : "border-custom"
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Password *</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
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
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Confirm Password *</label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.confirmPassword ? "border-danger bg-danger/10" : "border-custom"
                    }`}
                    placeholder="Confirm your password"
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
                {errors.confirmPassword && <p className="mt-1 text-sm text-danger">{errors.confirmPassword.message}</p>}
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
                {...register("businessName")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.businessName ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter your business name"
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.industryType ? "border-danger bg-danger/10" : "border-custom"
                  }`}
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
              {errors.industryType && <p className="mt-1 text-sm text-danger">{errors.industryType.message}</p>}
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
