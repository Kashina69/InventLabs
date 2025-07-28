import { create } from 'zustand'

interface DashboardData {
  lowStock: number
  outOfStock: number
  productStock: number
  totalCategories: number
  totalProducts: number
  totalStocks: number
}

interface DashboardStore {
  dashboardData: DashboardData
  setDashboardData: (data: DashboardData) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: {
    lowStock: 0,
    outOfStock: 0,
    productStock: 0,
    totalCategories: 0,
    totalProducts: 0,
    totalStocks: 0,
  },
  setDashboardData: (data) => set({ dashboardData: data }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
