import { create } from 'zustand'
import axios from '../config/axios'

export interface Alert {
  name: string
  sku: string
  categoryName: string
  stock: number
  threshold: number
  status: string
  lastUpdated: string
}

interface AlertsState {
  outOfStock: Alert[]
  lowStock: Alert[]
  loading: boolean
  error: string | null
  fetchAlerts: () => Promise<void>
}

export const useAlertsStore = create<AlertsState>((set) => ({
  outOfStock: [],
  lowStock: [],
  loading: false,
  error: null,
  fetchAlerts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/alerts/stock')
      set({
        outOfStock: response.data.outOfStock || [],
        lowStock: response.data.lowStock || [],
        loading: false,
      })
    } catch (error) {
      set({
        error: 'Failed to fetch alerts',
        loading: false,
      })
      console.error('Error fetching alerts:', error)
    }
  },
})) 