import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/config/axios";
import { jwtUtils } from "@/utils/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  businessName?: string;
  industryType?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    business_name: string;
  }) => Promise<User>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      initializeAuth: () => {
        // Check if there's a valid token on app startup
        const currentUser = jwtUtils.getCurrentUser();
        if (currentUser) {
          set({
            user: currentUser,
            isAuthenticated: true,
          });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/login", {
            email,
            password,
          });

          const { token, user } = response.data;

          // Store the token

          jwtUtils.setToken(token);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return user;
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/register", data);

          const { token, user } = response.data;

          // Store the token
          jwtUtils.setToken(token);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return user;
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(
            error.response?.data?.message || "Registration failed"
          );
        }
      },

      logout: () => {
        // Remove token from localStorage
        jwtUtils.removeToken();

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Don't persist user data, rely on JWT token instead
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
