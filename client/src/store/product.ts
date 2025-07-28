import { create } from "zustand";
import api from "@/config/axios";

interface Category {
  id: number;
  name: string;
  businessId: number;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  sku: string;
  name: string;
  barcode: string;
  categoryId: number;
  stock: number;
  threshold: number;
  expiryDate: string | null;
  businessId: number;
  createdAt: string;
  updatedAt: string;
  status: 'in stock' | 'low stock' | 'out of stock';
}

interface CreateProductData {
  sku: string;
  name: string;
  barcode: string;
  categoryId: number;
  stock: number;
  threshold: number;
  expiryDate: string;
}

interface UpdateProductData {
  sku: string;
  name: string;
  barcode: string;
  categoryId: number;
  stock: number;
  threshold: number;
  expiryDate: string | null;
}

interface ProductState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  selectedCategoryId: number | null;
  searchTerm: string;
}

interface ProductActions {
  fetchProducts: (categoryId?: number, search?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createProduct: (productData: CreateProductData) => Promise<void>;
  updateProduct: (productId: number, productData: UpdateProductData) => Promise<void>;
  setSelectedCategoryId: (categoryId: number | null) => void;
  setSearchTerm: (search: string) => void;
  clearError: () => void;
  clearProducts: () => void;
}

type ProductStore = ProductState & ProductActions;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedCategoryId: null,
  searchTerm: "",

  fetchProducts: async (categoryId?: number, search?: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      
      if (categoryId && categoryId !== 0) {
        params.append('categoryId', categoryId.toString());
      }
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }

      const response = await api.get(`/products/list?${params.toString()}`);
      set({ 
        products: response.data, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch products", 
        isLoading: false 
      });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await api.get('/category/list');
      set({ categories: response.data });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch categories" 
      });
    }
  },

  createProduct: async (productData: CreateProductData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.post('/products/add', productData);
      // Refresh the products list after creating a new product
      await get().fetchProducts();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to create product", 
        isLoading: false 
      });
      throw error;
    }
  },

  updateProduct: async (productId: number, productData: UpdateProductData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.put(`/products/update?id=${productId}`, productData);
      // Refresh the products list after updating a product
      await get().fetchProducts();
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to update product", 
        isLoading: false 
      });
      throw error;
    }
  },

  setSelectedCategoryId: (categoryId: number | null) => {
    set({ selectedCategoryId: categoryId });
  },

  setSearchTerm: (search: string) => {
    set({ searchTerm: search });
  },

  clearError: () => {
    set({ error: null });
  },

  clearProducts: () => {
    set({ products: [] });
  },
})); 