"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtUtils } from '@/utils/jwt'
import { useAuthStore } from '@/store/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'staff'
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { user, initializeAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Initialize auth store
      initializeAuth()
      
      // Check if token is valid
      const isAuthenticated = jwtUtils.isAuthenticated()
      
      if (!isAuthenticated) {
        router.push('/login')
        return
      }

      // If role is required, check user role
      if (requiredRole && user?.role !== requiredRole) {
        router.push('/login')
        return
      }

      setIsAuthorized(true)
      setIsChecking(false)
    }

    checkAuth()
  }, [initializeAuth, requiredRole, user, router])

  if (isChecking) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
} 