import { create } from "zustand";
import api from "@/config/axios";

interface Category {
  id: number;
  name: string;
  businessId: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Optional field for created by
}

interface CreateCategoryData {
  name: string;
  createdBy: string;
}

interface UpdateCategoryData {
  name: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  dateFilter: string;
}

interface CategoryActions {
  fetchCategories: (search?: string, date?: string) => Promise<void>;
  createCategory: (categoryData: CreateCategoryData) => Promise<void>;
  updateCategory: (categoryId: number, categoryData: UpdateCategoryData) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
  setSearchTerm: (search: string) => void;
  setDateFilter: (date: string) => void;
  clearError: () => void;
  clearFilters: () => void;
}

type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  dateFilter: "",

  fetchCategories: async (search?: string, date?: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }
      
      if (date && date.trim() !== '') {
        params.append('date', date.trim());
      }

      const response = await api.get(`/category/list?${params.toString()}`);
      set({ 
        categories: response.data, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch categories", 
        isLoading: false 
      });
    }
  },

  createCategory: async (categoryData: CreateCategoryData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.put('/category/add', categoryData);
      // Refresh the categories list after creating a new category
      await get().fetchCategories();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to create category", 
        isLoading: false 
      });
      throw error;
    }
  },

  updateCategory: async (categoryId: number, categoryData: UpdateCategoryData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.patch(`/category/edit?id=${categoryId}`, categoryData);
      // Refresh the categories list after updating a category
      await get().fetchCategories();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to update category", 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteCategory: async (categoryId: number) => {
    set({ isLoading: true, error: null });
    
    try {
      await api.delete(`/category/remove?id=${categoryId}`);
      // Refresh the categories list after deleting a category
      await get().fetchCategories();
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to delete category", 
        isLoading: false 
      });
      throw error;
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

  clearFilters: () => {
    set({ searchTerm: "", dateFilter: "" });
  },
})); 