"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus } from "lucide-react"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (category: { name: string }) => void
}

export default function AddCategoryModal({ isOpen, onClose, onAdd }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      onAdd({
        name: formData.name.trim(),
      })

      // Reset form
      setFormData({ name: "" })
      setErrors({})
    } catch (error) {
      console.error("Error adding category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "" })
      setErrors({})
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl border border-custom w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Add New Category</h2>
              <p className="text-sm text-muted">Create a new product category</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-muted hover:text-primary transition-colors touch-manipulation disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 ${
                errors.name ? "border-danger bg-danger/10" : "border-custom"
              }`}
              placeholder="Enter category name"
            />
            {errors.name && <p className="mt-1 text-sm text-danger">{errors.name}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
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
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
