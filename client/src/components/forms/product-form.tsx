"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    threshold: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys", "Food & Beverage"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.quantity || Number.parseInt(formData.quantity) < 0) newErrors.quantity = "Valid quantity is required"
    if (!formData.threshold || Number.parseInt(formData.threshold) < 0)
      newErrors.threshold = "Valid threshold is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Handle form submission
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/inventory"
          className="flex items-center gap-2 text-muted hover:text-primary transition-colors touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Inventory</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>

      <div className="bg-surface rounded-xl sm:rounded-2xl shadow-sm border border-custom p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-lg sm:rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Add New Product</h1>
            <p className="text-muted text-sm">Fill in the details to add a product to your inventory</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.name ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="mt-1 text-sm text-danger">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.sku ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter SKU"
              />
              {errors.sku && <p className="mt-1 text-sm text-danger">{errors.sku}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                errors.category ? "border-danger bg-danger/10" : "border-custom"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-danger">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.quantity ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter quantity"
              />
              {errors.quantity && <p className="mt-1 text-sm text-danger">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Low Stock Threshold *</label>
              <input
                type="number"
                name="threshold"
                value={formData.threshold}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.threshold ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter threshold"
              />
              {errors.threshold && <p className="mt-1 text-sm text-danger">{errors.threshold}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
            <button
              type="submit"
              className="flex-1 bg-accent text-white py-3 px-6 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors touch-manipulation"
            >
              Add Product
            </button>
            <Link
              href="/inventory"
              className="flex-1 bg-background border border-custom text-primary py-3 px-6 rounded-xl font-medium hover:bg-surface focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-surface transition-colors text-center touch-manipulation"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
