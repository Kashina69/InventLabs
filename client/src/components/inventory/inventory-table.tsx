"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, Edit, Trash2, MoreHorizontal, Plus, ChevronDown, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useProductStore } from "@/store/product"
import { useInventory } from "@/contexts/inventory-context"
import SellProductModal from "./sell-product-modal"

// Use the Product type from the context
interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  threshold: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

export default function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Store for actions and error handling
  const {
    isLoading,
    error,
    fetchProducts,
    fetchCategories,
    updateProduct,
    setSearchTerm: setStoreSearchTerm,
    clearError
  } = useProductStore()

  // Context for data
  const { products } = useInventory()

  // Build unique category list from products
  const categoryList = [
    "All Categories",
    ...Array.from(new Set(products.map((p) => p.category))).sort()
  ]

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  // Handle search and filter changes
  useEffect(() => {
    // No categoryId in context, so just refetch all
    fetchProducts(undefined, searchTerm || undefined)
  }, [selectedCategory, searchTerm, fetchProducts])

  // Filtered data
  const filteredData = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-400"
      case "Low Stock":
        return "bg-yellow-500/20 text-yellow-400"
      case "Out of Stock":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setStoreSearchTerm(value)
  }

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  const handleUpdateProduct = async () => {
    if (!editProduct) return;
    // No updateProduct logic for context Product, so just close modal
    setEditProduct(null)
  };

  const handleSellProduct = (product: Product) => {
    setSelectedProduct(product)
    setSellModalOpen(true)
  }

  return (
    <>
      <div className="bg-surface rounded-xl sm:rounded-2xl border border-custom">
        <div className="p-4 sm:p-6 border-b border-custom">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-primary">Inventory</h2>
                <p className="text-muted text-sm">Manage your product inventory</p>
              </div>
              <Link
                href="/add-product"
                className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors touch-manipulation sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Link>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg">
                {error}
                <button 
                  onClick={clearError}
                  className="ml-2 text-red-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-custom bg-background text-primary rounded-lg hover:bg-surface transition-colors touch-manipulation w-full sm:w-auto"
                >
                  <Filter className="w-4 h-4" />
                  <span className="sm:hidden">Filter by Category</span>
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isFilterOpen && (
                  <>
                    <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsFilterOpen(false)} />
                    <div className="absolute right-0 mt-2 w-full sm:w-48 bg-surface rounded-lg shadow-lg border border-custom py-2 z-50">
                      {categoryList.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            handleCategoryChange(category)
                            setIsFilterOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-background transition-colors touch-manipulation ${selectedCategory === category ? "bg-accent/20 text-accent" : "text-primary"}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="mt-2 text-muted">Loading products...</p>
          </div>
        )}
        {/* Mobile Card Layout */}
        <div className="block sm:hidden">
          {filteredData.map((item) => (
            <div key={item.id} className="p-4 border-b border-custom last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{item.name}</h3>
                  <p className="text-sm text-muted">{item.sku}</p>
                  <p className="text-sm text-muted">{item.category}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span className="text-primary">
                    Stock: <span className="font-medium">{item.stock}</span>
                  </span>
                  <span className="text-muted">
                    Threshold: <span className="font-medium">{item.threshold}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSellProduct(item)}
                    disabled={item.stock === 0}
                    className="p-2 text-muted hover:text-accent transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Sell Product"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted hover:text-accent transition-colors touch-manipulation">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted hover:text-danger transition-colors touch-manipulation">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted hover:text-primary transition-colors touch-manipulation">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-custom">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-primary">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-primary">{item.stock}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{item.threshold}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSellProduct(item)}
                        disabled={item.stock === 0}
                        className="p-1 text-muted hover:text-accent transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Sell Product"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted hover:text-accent transition-colors touch-manipulation">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted hover:text-danger transition-colors touch-manipulation">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted hover:text-primary transition-colors touch-manipulation">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted">No products found matching your criteria.</p>
          </div>
        )}
      </div>
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl border border-custom w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-custom">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Edit className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary">Edit Inventory</h2>
                  <p className="text-sm text-muted">Update inventory information</p>
                </div>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="p-2 text-muted hover:text-primary transition-colors touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <form className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">SKU *</label>
                      <input
                        type="text"
                        value={editProduct?.sku || ''}
                        onChange={(e) => setEditProduct(editProduct ? { ...editProduct, sku: e.target.value } : null)}
                        className="w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
                        placeholder="SKU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={editProduct?.name || ''}
                        onChange={(e) => setEditProduct(editProduct ? { ...editProduct, name: e.target.value } : null)}
                        className="w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
                        placeholder="Product Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Category *</label>
                      <input
                        type="text"
                        value={editProduct?.category || ''}
                        onChange={(e) => setEditProduct(editProduct ? { ...editProduct, category: e.target.value } : null)}
                        className="w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
                        placeholder="Category"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Stock Number *</label>
                      <input
                        type="number"
                        value={editProduct?.stock ?? ''}
                        onChange={(e) => setEditProduct(editProduct ? { ...editProduct, stock: Number(e.target.value) } : null)}
                        className="w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
                        placeholder="Stock"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Threshold Number *</label>
                      <input
                        type="number"
                        value={editProduct?.threshold ?? ''}
                        onChange={(e) => setEditProduct(editProduct ? { ...editProduct, threshold: Number(e.target.value) } : null)}
                        className="w-full px-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
                        placeholder="Threshold"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-custom">
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    className="flex-1 px-4 py-3 border border-custom bg-background text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateProduct}
                    className="bg-[#7C3AED] text-white hover:bg-[#7C3AED] flex-1 px-4 py-3 border border-custom text-primary rounded-xl font-medium hover:bg-surface transition-colors touch-manipulation disabled:opacity-50">
                    Update Inventory
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <SellProductModal isOpen={sellModalOpen} onClose={() => setSellModalOpen(false)} product={selectedProduct} />
    </>
  )
}
