import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { jwtUtils } from '@/utils/jwt'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add JWT token to Authorization header if available
    const token = jwtUtils.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      jwtUtils.removeToken()
      // You might want to trigger a logout action here
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
