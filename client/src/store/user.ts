import { create } from 'zustand'
import axios from '../config/axios'

export interface User {
  id: number
  name: string
  email: string
  role: string
  notificationPreferences: any
  phone: string
  businessId: number
  createdAt: string
  updatedAt: string
}

interface UpdateUserData {
  name?: string
  email?: string
  phone?: string
  password?: string
  currentPassword?: string
}

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
  fetchUser: () => Promise<void>
  updateUser: (data: UpdateUserData) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/user/profile')
      set({
        user: response.data,
        loading: false,
      })
    } catch (error) {
      set({
        error: 'Failed to fetch user profile',
        loading: false,
      })
      console.error('Error fetching user profile:', error)
    }
  },
  updateUser: async (data: UpdateUserData) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.put('/user/profile', data)
      set({
        user: response.data,
        loading: false,
      })
    } catch (error) {
      set({
        error: 'Failed to update user profile',
        loading: false,
      })
      console.error('Error updating user profile:', error)
    }
  },
})) 