"use client"

import { useState } from "react"
import { Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react"

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

  const getStatusColor = (status) => {
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
    <div className="bg-slate-800 rounded-2xl border border-slate-700">
      <div className="p-6 border-b border-[#303136]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#E5E5E5]">Inventory</h2>
            <p className="text-gray-400 text-sm">Manage your product inventory</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 w-64"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#232429] rounded-lg shadow-lg border border-[#303136] py-2 z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsFilterOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#303136] transition-colors ${
                        selectedCategory === category ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "text-[#E5E5E5]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Threshold
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-[#303136] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-[#E5E5E5]">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-[#E5E5E5]">{item.stock}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.threshold}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-[#7C3AED] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-[#E5E5E5] transition-colors">
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
          <p className="text-gray-400">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
