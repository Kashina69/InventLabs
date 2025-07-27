"use client"

import { useState } from "react"
import { X, Trash2, AlertTriangle } from "lucide-react"

interface DeleteCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  category: any
}

export default function DeleteCategoryModal({ isOpen, onClose, onDelete, category }: DeleteCategoryModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onDelete()
    } catch (error) {
      console.error("Error deleting category:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      onClose()
    }
  }

  if (!isOpen || !category) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl border border-custom w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-danger/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-danger" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Delete Category</h2>
              <p className="text-sm text-muted">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="p-2 text-muted hover:text-primary transition-colors touch-manipulation disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-primary mb-4">
              Are you sure you want to delete the category <strong>"{category.name}"</strong>?
            </p>

            <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-danger font-medium mb-1">Warning:</p>
                  <ul className="text-muted space-y-1">
                    <li>• This will permanently delete the category</li>
                    <li>• Products in this category may become uncategorized</li>
                    <li>• This action cannot be reversed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-muted">Category:</span>
              <span className="text-primary font-medium ml-2">{category.name}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted">Created by:</span>
              <span className="text-primary ml-2">{category.createdBy}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted">Business:</span>
              <span className="text-primary ml-2">{category.businessName}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 border border-custom bg-background text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-danger text-white px-4 py-3 rounded-xl font-medium hover:bg-danger/90 transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Category
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
