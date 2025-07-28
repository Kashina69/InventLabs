"use client"

import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Eye, EyeOff, LogIn, Package, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"
import { jwtUtils } from "@/utils/jwt"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuthStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  console.log( jwtUtils.isAuthenticated())

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await login(data.email, data.password)
      // Redirect based on user role
      if (user?.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else if (user?.role === "staff") {
        router.push("/staff/dashboard")
      } else {
        router.push("/admin/dashboard") // Default fallback
      }
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Login failed",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 safe-area-inset">
      <div className="bg-surface border border-custom rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-muted text-sm">Sign in to your inventory dashboard</p>
        </div>

        {errors.root && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
            <input
              {...register("email")}
              type="email"
              className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                errors.email ? "border-danger bg-danger/10" : "border-custom"
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <p className="mt-1 text-sm text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 pr-12 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.password ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter your password"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 px-6 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors touch-manipulation flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-muted text-sm">
            Need to create an admin account?{" "}
            <Link href="/admin-signup" className="text-accent hover:underline">
              Register as Admin
            </Link>
          </p>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-accent font-medium mb-1">Staff Accounts</p>
                <p className="text-muted">
                  Staff accounts can only be created by administrators through the staff management interface.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-custom">
            <p className="text-xs text-muted mb-3">Demo Accounts:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted">
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium text-primary mb-1">Admin</p>
                <p>admin@example.com</p>
                <p>password123</p>
              </div>
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium text-primary mb-1">Staff</p>
                <p>staff@example.com</p>
                <p>password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
