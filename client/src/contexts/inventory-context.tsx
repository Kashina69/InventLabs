"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useAuth } from "./auth-context"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  threshold: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

interface Transaction {
  id: string
  productId: number
  productName: string
  productSku: string
  type: "sale" | "restock" | "adjustment"
  quantity: number
  customerName?: string
  customerEmail?: string
  notes?: string
  user: string
  userId: string
  timestamp: string
  date: string
  time: string
}

interface SaleData {
  quantity: number
  customerName: string
  customerEmail?: string
  notes?: string
}

interface InventoryContextType {
  products: Product[]
  transactions: Transaction[]
  sellProduct: (productId: number, saleData: SaleData) => Promise<void>
  updateProductStock: (
    productId: number,
    newStock: number,
    type: "restock" | "adjustment",
    notes?: string,
  ) => Promise<void>
  getProductById: (id: number) => Product | undefined
  getRecentTransactions: (limit?: number) => Transaction[]
  isLoading: boolean
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

// Mock data
const initialProducts: Product[] = [
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

const initialTransactions: Transaction[] = [
  {
    id: "1",
    productId: 1,
    productName: "iPhone 14 Pro",
    productSku: "IPH14P-128-BLK",
    type: "restock",
    quantity: 50,
    user: "John Doe",
    userId: "1",
    timestamp: "2 hours ago",
    date: "2024-01-15",
    time: "10:30 AM",
    notes: "New stock arrival",
  },
  {
    id: "2",
    productId: 2,
    productName: "Samsung Galaxy S23",
    productSku: "SGS23-256-WHT",
    type: "sale",
    quantity: 15,
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    user: "Jane Smith",
    userId: "2",
    timestamp: "4 hours ago",
    date: "2024-01-15",
    time: "09:15 AM",
    notes: "Customer order fulfillment",
  },
]

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const updateProductStatus = (product: Product): Product => {
    let status: "In Stock" | "Low Stock" | "Out of Stock"

    if (product.stock === 0) {
      status = "Out of Stock"
    } else if (product.stock <= product.threshold) {
      status = "Low Stock"
    } else {
      status = "In Stock"
    }

    return { ...product, status }
  }

  const sellProduct = async (productId: number, saleData: SaleData) => {
    if (!user) throw new Error("User not authenticated")

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const product = products.find((p) => p.id === productId)
      if (!product) throw new Error("Product not found")

      if (saleData.quantity > product.stock) {
        throw new Error("Insufficient stock")
      }

      // Update product stock
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? updateProductStatus({ ...p, stock: p.stock - saleData.quantity }) : p,
        ),
      )

      // Create transaction record
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        productId,
        productName: product.name,
        productSku: product.sku,
        type: "sale",
        quantity: saleData.quantity,
        customerName: saleData.customerName,
        customerEmail: saleData.customerEmail,
        notes: saleData.notes,
        user: user.name,
        userId: user.id,
        timestamp: "Just now",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }

      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions])
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProductStock = async (
    productId: number,
    newStock: number,
    type: "restock" | "adjustment",
    notes?: string,
  ) => {
    if (!user) throw new Error("User not authenticated")

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const product = products.find((p) => p.id === productId)
      if (!product) throw new Error("Product not found")

      const quantityChange = newStock - product.stock

      // Update product stock
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? updateProductStatus({ ...p, stock: newStock }) : p)),
      )

      // Create transaction record
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        productId,
        productName: product.name,
        productSku: product.sku,
        type,
        quantity: Math.abs(quantityChange),
        notes,
        user: user.name,
        userId: user.id,
        timestamp: "Just now",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }

      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions])
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getProductById = (id: number): Product | undefined => {
    return products.find((product) => product.id === id)
  }

  const getRecentTransactions = (limit = 5): Transaction[] => {
    return transactions.slice(0, limit)
  }

  return (
    <InventoryContext.Provider
      value={{
        products,
        transactions,
        sellProduct,
        updateProductStock,
        getProductById,
        getRecentTransactions,
        isLoading,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}
