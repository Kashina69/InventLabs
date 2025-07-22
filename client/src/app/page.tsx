"use client";
import { useEffect } from "react";
import { create } from "zustand";

type Store = {
  backendResponse: string | null;
  setBackendResponse: (data: string) => void;
};

const useStore = create<Store>((set) => ({
  backendResponse: null,
  setBackendResponse: (data: string) => set({ backendResponse: data }),
}));

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "8080";
export default function App() {
  const { backendResponse, setBackendResponse } = useStore();

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const response = await fetch(`http://localhost:${backendPort}`);
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
      <h1 className="text-4xl font-bold text-center text-white">Backend Response</h1>
        {backendResponse || "Loading..."}
      </div>
    </div>
  );
}
