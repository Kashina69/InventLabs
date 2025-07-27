"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys", "Food & Beverage"]

const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  sku: z.string().min(2, "SKU must be at least 2 characters").max(50, "SKU must be less than 50 characters"),
  category: z.string().min(1, "Please select a category"),
  quantity: z.coerce.number().min(0, "Quantity must be 0 or greater"),
  threshold: z.coerce.number().min(0, "Threshold must be 0 or greater"),
})

type ProductForm = z.infer<typeof productSchema>

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      threshold: 0,
    },
  })

  const onSubmit = async (data: ProductForm) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      // Handle form submission
    } catch (error) {
      console.error("Error submitting form:", error)
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Product Name *</label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.name ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-sm text-danger">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">SKU *</label>
              <input
                {...register("sku")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.sku ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter SKU"
                disabled={isSubmitting}
              />
              {errors.sku && <p className="mt-1 text-sm text-danger">{errors.sku.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category *</label>
            <select
              {...register("category")}
              className={`w-full px-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                errors.category ? "border-danger bg-danger/10" : "border-custom"
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-danger">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Quantity *</label>
              <input
                {...register("quantity")}
                type="number"
                min="0"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.quantity ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter quantity"
                disabled={isSubmitting}
              />
              {errors.quantity && <p className="mt-1 text-sm text-danger">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Low Stock Threshold *</label>
              <input
                {...register("threshold")}
                type="number"
                min="0"
                className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.threshold ? "border-danger bg-danger/10" : "border-custom"
                }`}
                placeholder="Enter threshold"
                disabled={isSubmitting}
              />
              {errors.threshold && <p className="mt-1 text-sm text-danger">{errors.threshold.message}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent text-white py-3 px-6 rounded-xl font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors touch-manipulation flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
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
