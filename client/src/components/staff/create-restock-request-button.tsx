"use client"

import { useState } from "react"
import { Plus, X, Package, CheckCircle } from "lucide-react"

// Placeholder data
const productsData = [
  { id: 1, name: "iPhone 14 Pro", sku: "IPH14P-128-BLK", stock: 5 },
  { id: 2, name: "Samsung Galaxy S23", sku: "SGS23-256-WHT", stock: 3 },
  { id: 3, name: "MacBook Air M2", sku: "MBA-M2-512-SLV", stock: 0 },
  { id: 4, name: "Nike Air Max 270", sku: "NAM270-10-BLK", stock: 8 },
  { id: 5, name: "Levi's 501 Jeans", sku: "LV501-32-BLU", stock: 15 },
]

export default function CreateRestockRequestButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    notes: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.productId) {
      newErrors.productId = "Please select a product"
    }

    if (!formData.quantity) {
      newErrors.quantity = "Please enter a quantity"
    } else if (Number.parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSuccess(true)

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          productId: "",
          quantity: "",
          notes: "",
        })
        setIsSuccess(false)
        setIsModalOpen(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting restock request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        productId: "",
        quantity: "",
        notes: "",
      })
      setErrors({})
      setIsSuccess(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors touch-manipulation sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        Create Restock Request
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl border border-custom w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-custom">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary">Create Restock Request</h2>
                  <p className="text-sm text-muted">Request additional inventory</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="p-2 text-muted hover:text-primary transition-colors touch-manipulation disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {isSuccess ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Restock request submitted successfully!</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Product *</label>
                    <select
                      name="productId"
                      value={formData.productId}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-xl bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                        errors.productId ? "border-danger bg-danger/10" : "border-custom"
                      }`}
                    >
                      <option value="">Select a product</option>
                      {productsData.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.sku}) - Current Stock: {product.stock}
                        </option>
                      ))}
                    </select>
                    {errors.productId && <p className="mt-1 text-sm text-danger">{errors.productId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Quantity Needed *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                        errors.quantity ? "border-danger bg-danger/10" : "border-custom"
                      }`}
                      placeholder="Enter quantity"
                      min="1"
                    />
                    {errors.quantity && <p className="mt-1 text-sm text-danger">{errors.quantity}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-custom bg-background text-primary placeholder-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 min-h-[100px]"
                      placeholder="Add any additional information"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 border border-custom bg-background text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-accent text-white px-4 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}
