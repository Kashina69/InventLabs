"use client";
import { create } from "zustand";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
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
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) {
  //       router.push("/login");
  //     } else if (user.role === "admin") {
  //       router.push("/admin/dashboard");
  //     } else {
  //       router.push("/staff/dashboard");
  //     }
  //   }
  // }, [user, isLoading, router]);

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const response = await fetch(backendURL);
        const data = await response.json();
        console.log(data, "data ersponse ");
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