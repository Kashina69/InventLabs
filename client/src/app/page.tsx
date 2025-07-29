"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  useEffect(() => {
      if (!localStorage.getItem("auth_token")) {
        router.push("/login");
      } else{
        router.push("/admin/dashboard")
      }
  }, [ router]);


  return (
    <div></div>
  );
}
