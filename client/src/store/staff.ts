import { create } from "zustand";
import api from "@/config/axios";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "STAFF";
  businessId: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateStaffData {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
}

interface UpdateStaffData {
  name: string;
  email: string;
  phone?: string;
}

interface StaffState {
  staff: Staff[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}

interface StaffActions {
  fetchStaff: (search?: string) => Promise<void>;
  createStaff: (staffData: CreateStaffData) => Promise<void>;
  updateStaff: (staffId: number, staffData: UpdateStaffData) => Promise<void>;
  deleteStaff: (staffId: number) => Promise<void>;
  setSearchTerm: (search: string) => void;
  clearError: () => void;
  clearStaff: () => void;
}

type StaffStore = StaffState & StaffActions;

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  isLoading: false,
  error: null,
  searchTerm: "",

  fetchStaff: async (search?: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }

      const response = await api.get(`/staff/list?${params.toString()}`);
      set({ 
        staff: response.data, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch staff", 
        isLoading: false 
      });
    }
  },

  createStaff: async (staffData: CreateStaffData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.put('/staff/register', {
        name: staffData.name,
        email: staffData.email,
        passwordHash: staffData.passwordHash, // This will be hashed on the server
        phone: staffData.phone,
      });
      // Refresh the staff list after creating a new staff member
      await get().fetchStaff();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to create staff", 
        isLoading: false 
      });
      throw error;
    }
  },

  updateStaff: async (staffId: number, staffData: UpdateStaffData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.patch('/staff/update', {
        id: staffId,
        ...staffData
      });
      // Refresh the staff list after updating a staff member
      await get().fetchStaff();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to update staff", 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteStaff: async (staffId: number) => {
    set({ isLoading: true, error: null });
    
    try {
      await api.delete('/staff/remove', {
        data: { id: staffId }
      });
      // Refresh the staff list after deleting a staff member
      await get().fetchStaff();
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to delete staff", 
        isLoading: false 
      });
      throw error;
    }
  },

  setSearchTerm: (search: string) => {
    set({ searchTerm: search });
  },

  clearError: () => {
    set({ error: null });
  },

  clearStaff: () => {
    set({ staff: [] });
  },
})); 