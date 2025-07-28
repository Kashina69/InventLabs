"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, ShoppingCart, AlertCircle } from "lucide-react"
import { useInventory } from "@/contexts/inventory-context"

const sellProductSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1").max(1000, "Quantity cannot exceed 1000"),
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100, "Customer name cannot exceed 100 characters"),
  customerEmail: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
})

type SellProductFormData = z.infer<typeof sellProductSchema>

interface Product {
  id: number
  name: string
  sku: string
  stock: number
  category: string
}

interface SellProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export default function SellProductModal({ isOpen, onClose, product }: SellProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { sellProduct } = useInventory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm<SellProductFormData>({
    resolver: zodResolver(sellProductSchema),
    defaultValues: {
      quantity: 1,
      customerName: "",
      customerEmail: "",
      notes: "",
    },
  })

  const quantity = watch("quantity")

  const onSubmit = async (data: SellProductFormData) => {
    if (!product) return

    if (data.quantity > product.stock) {
      setError("quantity", {
        type: "manual",
        message: `Only ${product.stock} units available in stock`,
      })
      return
    }

    setIsSubmitting(true)
    try {
      await sellProduct(product.id, {
        quantity: data.quantity,
        customerName: data.customerName,
        customerEmail: data.customerEmail || undefined,
        notes: data.notes || undefined,
      })

      reset()
      onClose()
    } catch (error) {
      console.error("Error selling product:", error)
      setError("root", {
        type: "manual",
        message: "Failed to process sale. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-2xl border border-custom w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Sell Product</h2>
              <p className="text-sm text-muted">Process a sale transaction</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Product Info */}
          <div className="bg-background rounded-lg p-4 border border-custom">
            <h3 className="font-medium text-primary mb-2">{product.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted">SKU:</span>
                <span className="text-primary ml-2">{product.sku}</span>
              </div>
              <div>
                <span className="text-muted">Available:</span>
                <span className="text-primary ml-2">{product.stock} units</span>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-primary mb-2">
              Quantity to Sell *
            </label>
            <input
              {...register("quantity")}
              type="number"
              min="1"
              max={product.stock}
              className="w-full px-4 py-3 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter quantity"
              disabled={isSubmitting}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.quantity.message}
              </p>
            )}
            {quantity > product.stock && (
              <p className="mt-1 text-sm text-yellow-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Insufficient stock available
              </p>
            )}
          </div>

          {/* Customer Name */}
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-primary mb-2">
              Customer Name *
            </label>
            <input
              {...register("customerName")}
              type="text"
              className="w-full px-4 py-3 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter customer name"
              disabled={isSubmitting}
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Customer Email */}
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-primary mb-2">
              Customer Email (Optional)
            </label>
            <input
              {...register("customerEmail")}
              type="email"
              className="w-full px-4 py-3 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter customer email"
              disabled={isSubmitting}
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-primary mb-2">
              Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              className="w-full px-4 py-3 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Add any additional notes..."
              disabled={isSubmitting}
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.notes.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errors.root && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.root.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-custom text-muted hover:bg-background rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || quantity > product.stock}
              className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Complete Sale
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
