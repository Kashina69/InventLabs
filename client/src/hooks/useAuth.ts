import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { jwtUtils } from '@/utils/jwt'

export function useAuth() {
  const { user, isLoading, isAuthenticated, initializeAuth } = useAuthStore()
  const [isTokenValid, setIsTokenValid] = useState(false)

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth()
    
    // Check token validity
    const checkToken = () => {
      const valid = jwtUtils.isAuthenticated()
      setIsTokenValid(valid)
    }

    checkToken()
    
    // Set up interval to check token validity periodically
    const interval = setInterval(checkToken, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [initializeAuth])

  const isAuthenticatedAndValid = isAuthenticated && isTokenValid

  return {
    user,
    isLoading,
    isAuthenticated: isAuthenticatedAndValid,
    isTokenValid,
    initializeAuth,
    // Helper functions
    hasRole: (role: 'admin' | 'staff') => user?.role === role,
    isAdmin: user?.role === 'admin',
    isStaff: user?.role === 'staff',
  }
} 