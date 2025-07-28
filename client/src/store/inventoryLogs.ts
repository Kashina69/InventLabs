import { create } from "zustand";
import api from "@/config/axios";
import type { InventoryLogItem } from "@/../../types/inventoryLog";

interface InventoryLog {
  id: number;
  productName: string;
  productSku: string;
  categoryName: string;
  userName: string;
  type: string;
  quantity: number;
  timestamp: string;
  status: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface InventoryLogsState {
  logs: InventoryLog[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  dateFilter: string;
}

interface InventoryLogsActions {
  fetchLogs: (search?: string, date?: string, page?: number) => Promise<void>;
  setSearchTerm: (search: string) => void;
  setDateFilter: (date: string) => void;
  clearError: () => void;
}

type InventoryLogsStore = InventoryLogsState & InventoryLogsActions;

export const useInventoryLogsStore = create<InventoryLogsStore>((set, get) => ({
  logs: [],
  pagination: null,
  isLoading: false,
  error: null,
  searchTerm: "",
  dateFilter: "",

  fetchLogs: async (search?: string, date?: string, page: number = 1) => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (search && search.trim() !== "") {
        params.append("search", search.trim());
      }
      if (date && date.trim() !== "") {
        params.append("date", date.trim());
      }
      params.append("page", page.toString());
      const response = await api.get(`/inventory-logs/logs?${params.toString()}`);
      set({
        logs: response.data.data.logs,
        pagination: response.data.data.pagination,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch inventory logs",
        isLoading: false,
      });
    }
  },

  setSearchTerm: (search: string) => {
    set({ searchTerm: search });
  },

  setDateFilter: (date: string) => {
    set({ dateFilter: date });
  },

  clearError: () => {
    set({ error: null });
  },
})); 