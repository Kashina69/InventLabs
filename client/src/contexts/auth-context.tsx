"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "STAFF"
  businessName?: string
  industryType?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  registerAdmin: (data: {
    name: string
    email: string
    password: string
    businessName: string
    industryType: string
  }) => Promise<void>
  createStaffAccount: (data: {
    name: string
    email: string
    password: string
    businessName: string
    industryType: string
  }) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      let mockUser: User
      if (email === "admin@example.com" && password === "password123") {
        mockUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          businessName: "Tech Solutions Inc",
          industryType: "Technology",
        }
      } else if (email === "staff@example.com" && password === "password123") {
        mockUser = {
          id: "2",
          name: "Staff User",
          email: "staff@example.com",
          role: "staff",
          businessName: "Tech Solutions Inc",
          industryType: "Technology",
        }
      } else {
        throw new Error("Invalid email or password")
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Redirect based on role
      if (mockUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/staff/dashboard")
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const registerAdmin = async (data: {
    name: string
    email: string
    password: string
    businessName: string
    industryType: string
  }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newAdmin: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        businessName: data.businessName,
        industryType: data.industryType,
      }

      setUser(newAdmin)
      localStorage.setItem("user", JSON.stringify(newAdmin))
      router.push("/admin/dashboard")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createStaffAccount = async (data: {
    name: string
    email: string
    password: string
    businessName: string
    industryType: string
  }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would create the staff account via API
      console.log("Staff account created:", data)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerAdmin,
        createStaffAccount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
