"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import ProductForm from "@/components/forms/product-form"

export default function AddProductPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <ProductForm />
      </div>
    </DashboardLayout>
  )
}
