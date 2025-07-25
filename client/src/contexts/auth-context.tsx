"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "admin" | "staff"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  businessName?: string
  industryType?: string
}

interface AdminRegistrationData {
  name: string
  email: string
  password: string
  businessName: string
  industryType: string
}

interface StaffAccountData {
  name: string
  email: string
  password: string
  businessName: string
  industryType: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  registerAdmin: (adminData: AdminRegistrationData) => Promise<void>
  createStaffAccount: (staffData: StaffAccountData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
    businessName: "Demo Business",
    industryType: "Technology",
  },
  {
    id: "2",
    name: "Staff User",
    email: "staff@example.com",
    password: "password123",
    role: "staff" as UserRole,
    businessName: "Tech Solutions Inc",
    industryType: "Technology",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in mock data
      const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser

      // Save user to state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Redirect based on role
      if (foundUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/staff/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const registerAdmin = async (adminData: AdminRegistrationData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (mockUsers.some((u) => u.email.toLowerCase() === adminData.email.toLowerCase())) {
        throw new Error("User with this email already exists")
      }

      // Create new admin user
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        role: "admin" as UserRole,
        businessName: adminData.businessName,
        industryType: adminData.industryType,
      }

      // Add to mock database
      mockUsers.push(newUser)

      // Create user object without password
      const { password: _, ...userWithoutPassword } = newUser

      // Save user to state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Redirect to admin dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Admin registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createStaffAccount = async (staffData: StaffAccountData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (mockUsers.some((u) => u.email.toLowerCase() === staffData.email.toLowerCase())) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name: staffData.name,
        email: staffData.email,
        password: staffData.password,
        role: "staff" as UserRole,
        businessName: staffData.businessName,
        industryType: staffData.industryType,
      }

      // Add to mock database
      mockUsers.push(newUser)
      console.log("Staff account created successfully:", newUser)
    } catch (error) {
      console.error("Create staff account error:", error)
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
    <AuthContext.Provider value={{ user, isLoading, login, registerAdmin, createStaffAccount, logout }}>
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
