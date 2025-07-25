"use client"

import { useState } from "react"
import { Search, Filter, Edit, Trash2, MoreHorizontal, Plus, ChevronDown } from "lucide-react"
import Link from "next/link"

const inventoryData = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    sku: "IPH14P-128-BLK",
    category: "Electronics",
    stock: 45,
    threshold: 10,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    sku: "SGS23-256-WHT",
    category: "Electronics",
    stock: 3,
    threshold: 15,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    sku: "MBA-M2-512-SLV",
    category: "Electronics",
    stock: 0,
    threshold: 8,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    sku: "NAM270-10-BLK",
    category: "Footwear",
    stock: 28,
    threshold: 20,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Levi's 501 Jeans",
    sku: "LV501-32-BLU",
    category: "Clothing",
    stock: 15,
    threshold: 25,
    status: "Low Stock",
  },
]

const categories = ["All Categories", "Electronics", "Clothing", "Footwear", "Home & Garden"]

export default function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredData = inventoryData.filter((item) => {
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

  return (
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

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsFilterOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-background transition-colors touch-manipulation ${
                          selectedCategory === category ? "bg-accent/20 text-accent" : "text-primary"
                        }`}
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
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
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
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Product Name
              </th>
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
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
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

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
