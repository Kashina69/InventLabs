"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Calendar, Filter, X } from "lucide-react"
import AddCategoryModal from "./add-category-modal"
import EditCategoryModal from "./edit-category-modal"
import DeleteCategoryModal from "./delete-category-modal"

// Placeholder data
const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    createdBy: "John Doe (john@example.com)",
    createdAt: "2024-01-15",
    businessId: "business-1",
    businessName: "Tech Store",
  },
  {
    id: 2,
    name: "Clothing",
    createdBy: "Jane Smith (jane@example.com)",
    createdAt: "2024-01-14",
    businessId: "business-1",
    businessName: "Tech Store",
  },
  {
    id: 3,
    name: "Home & Garden",
    createdBy: "Mike Johnson (mike@example.com)",
    createdAt: "2024-01-13",
    businessId: "business-2",
    businessName: "Home Depot",
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    createdBy: "Sarah Wilson (sarah@example.com)",
    createdAt: "2024-01-12",
    businessId: "business-1",
    businessName: "Tech Store",
  },
  {
    id: 5,
    name: "Books & Media",
    createdBy: "Tom Brown (tom@example.com)",
    createdAt: "2024-01-11",
    businessId: "business-3",
    businessName: "Media World",
  },
  {
    id: 6,
    name: "Health & Beauty",
    createdBy: "Lisa Davis (lisa@example.com)",
    createdAt: "2024-01-10",
    businessId: "business-2",
    businessName: "Home Depot",
  },
  {
    id: 7,
    name: "Automotive",
    createdBy: "David Miller (david@example.com)",
    createdAt: "2024-01-09",
    businessId: "business-1",
    businessName: "Tech Store",
  },
  {
    id: 8,
    name: "Food & Beverage",
    createdBy: "Emma Wilson (emma@example.com)",
    createdAt: "2024-01-08",
    businessId: "business-3",
    businessName: "Media World",
  },
]

export default function CategoriesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState(categoriesData)

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = !dateFilter || category.createdAt === dateFilter
    return matchesSearch && matchesDate
  })

  const handleAddCategory = (newCategory) => {
    const category = {
      id: categories.length + 1,
      ...newCategory,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCategories([...categories, category])
    setIsAddModalOpen(false)
  }

  const handleEditCategory = (updatedCategory) => {
    setCategories(categories.map((cat) => (cat.id === selectedCategory.id ? { ...cat, ...updatedCategory } : cat)))
    setIsEditModalOpen(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategory = () => {
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id))
    setIsDeleteModalOpen(false)
    setSelectedCategory(null)
  }

  const openEditModal = (category) => {
    setSelectedCategory(category)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  const clearDateFilter = () => {
    setDateFilter("")
  }

  return (
    <div className="bg-surface rounded-xl sm:rounded-2xl border border-custom">
      <div className="p-4 sm:p-6 border-b border-custom">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-primary">Categories</h2>
              <p className="text-muted text-sm">Manage product categories for your inventory</p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors touch-manipulation sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="relative flex items-center gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              {dateFilter && (
                <button
                  onClick={clearDateFilter}
                  className="p-2 text-muted hover:text-primary transition-colors touch-manipulation"
                  title="Clear date filter"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {(searchTerm || dateFilter) && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Filter className="w-4 h-4" />
              <span>
                Showing {filteredCategories.length} of {categories.length} categories
                {searchTerm && ` matching "${searchTerm}"`}
                {dateFilter && ` created on ${dateFilter}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        {filteredCategories.map((category) => (
          <div key={category.id} className="p-4 border-b border-custom last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-primary text-lg">{category.name}</h3>
                <p className="text-sm text-muted mt-1">{category.createdBy}</p>
                <p className="text-sm text-muted">{category.businessName}</p>
                <p className="text-xs text-muted mt-2">Created: {category.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => openEditModal(category)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-background border border-custom text-primary rounded-lg hover:bg-surface transition-colors touch-manipulation"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(category)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-danger/10 border border-danger/20 text-danger rounded-lg hover:bg-danger/20 transition-colors touch-manipulation"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Business</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-custom">
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-primary text-lg">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary">{category.createdBy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-muted">{category.businessName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{category.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-background border border-custom text-primary rounded-lg hover:bg-surface transition-colors touch-manipulation"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-danger/10 border border-danger/20 text-danger rounded-lg hover:bg-danger/20 transition-colors touch-manipulation"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">
            {searchTerm || dateFilter
              ? "No categories found matching your criteria."
              : "No categories found. Create your first category to get started."}
          </p>
        </div>
      )}

      {/* Modals */}
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddCategory} />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCategory(null)
        }}
        onEdit={handleEditCategory}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedCategory(null)
        }}
        onDelete={handleDeleteCategory}
        category={selectedCategory}
      />
    </div>
  )
}
