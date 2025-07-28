import {jwtDecode} from 'jwt-decode'

interface JWTPayload {
  id: string
  name: string
  email: string
  role: "ADMIN" | "ADMIN"
  businessName?: string
  industryType?: string
  phone?: string
  iat: number
  exp: number
}

export const JWT_KEY = 'auth_token'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

export const jwtUtils = {
  // Store token in localStorage
  setToken: (token: string) => {
    if (isBrowser) {
      localStorage.setItem(JWT_KEY, token)
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (!isBrowser) return null
    return localStorage.getItem(JWT_KEY)
  },

  // Remove token from localStorage
  removeToken: () => {
    if (isBrowser) {
      localStorage.removeItem(JWT_KEY)
    }
  },

  // Decode token and return payload
  decodeToken: (token: string): JWTPayload | null => {
    try {
      return jwtDecode<JWTPayload>(token)
    } catch (error) {
      console.error('Error decoding JWT:', error)
      return null
    }
  },

  // Check if token is valid (not expired)
  isTokenValid: (token: string): boolean => {
    try {
      const decoded = jwtDecode<JWTPayload>(token)
      const currentTime = Date.now() / 1000
      return decoded.exp > currentTime
    } catch (error) {
      return false
    }
  },

  // Get user data from token
  getUserFromToken: (token: string) => {
    try {
      const decoded = jwtDecode<JWTPayload>(token)
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        businessName: decoded.businessName,
        industryType: decoded.industryType,
        phone: decoded.phone,
      }
    } catch (error) {
      return null
    }
  },

  // Check if user is authenticated and token is valid
  isAuthenticated: (): boolean => {
    const token = jwtUtils.getToken()
    if (!token) return false
    return jwtUtils.isTokenValid(token)
  },

  // Get current user from token
  getCurrentUser: () => {
    const token = jwtUtils.getToken()
    if (!token || !jwtUtils.isTokenValid(token)) {
      return null
    }
    return jwtUtils.getUserFromToken(token)
  }
} 