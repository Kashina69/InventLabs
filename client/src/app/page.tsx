"use client";
import { create } from "zustand";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { jwtUtils } from "@/utils/jwt";

type Store = {
  backendResponse: string | null;
  setBackendResponse: (data: string) => void;
};

const useStore = create<Store>((set) => ({
  backendResponse: null,
  setBackendResponse: (data: string) => set({ backendResponse: data }),
}));

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/";

export default function App() {
  const { backendResponse, setBackendResponse } = useStore();
  const { user, isLoading, isAuthenticated, initializeAuth } = useAuthStore();
  const router = useRouter();

  // Initialize authentication on app startup
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading) {
      // Check if user is authenticated via JWT token
      if (!jwtUtils.isAuthenticated()) {
        // router.push("/login");
      } else {
        // Redirect based on user role
        if (user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (user?.role === "STAFF") {
          router.push("/staff/dashboard");
        } else {
          router.push("/admin/dashboard"); // Default fallback
        }
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const response = await fetch(backendURL);
        const data = await response.text();
        console.log(data, "data response ");
        setBackendResponse(data);
      } catch (error) {
        console.error("Error fetching backend:", error);
      }
    };

    fetchBackend();
  }, [setBackendResponse]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center text-white">InventLabs</h1>
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-green-500">
        <h1 className="text-4xl font-bold text-center text-white">
          Backend Response
        </h1>
        {backendResponse || "Loading..."}
      </div>
    </div>
  );
}
