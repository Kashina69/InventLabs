"use client"

import { useState } from "react"
import { Search, Calendar, ShoppingCart, User, Mail } from "lucide-react"

export default function SalesTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const transactions = [
        {
            id: 1,
            type: "sale",
            productName: "Apple iPhone 14 Pro",
            productSku: "APL-IP14P-256GB",
            quantity: 2,
            price: 999,
            total: 1998,
            date: "2024-06-01",
            time: "10:15",
            customerName: "John Doe",
            customerEmail: "john.doe@example.com",
            user: "Alice Smith",
            notes: "Requested gift wrap"
        },
        {
            id: 2,
            type: "sale",
            productName: "Samsung 4K Smart TV",
            productSku: "SMSNG-TV-4K55",
            quantity: 1,
            price: 699,
            total: 699,
            date: "2024-06-02",
            time: "14:30",
            customerName: "Jane Smith",
            customerEmail: "jane.smith@example.com",
            user: "Bob Johnson",
            notes: "Delivery scheduled for 2024-06-05"
        },
        {
            id: 3,
            type: "sale",
            productName: "Men's Running Shoes",
            productSku: "SHOE-MEN-RUN-BLK",
            quantity: 3,
            price: 120,
            total: 360,
            date: "2024-06-03",
            time: "09:45",
            customerName: "Carlos Rivera",
            customerEmail: "carlos.rivera@example.com",
            user: "Alice Smith",
            notes: ""
        },
        {
            id: 4,
            type: "sale",
            productName: "Cotton T-Shirt",
            productSku: "TSHIRT-CTN-WHT",
            quantity: 5,
            price: 25,
            total: 125,
            date: "2024-06-01",
            time: "16:20",
            customerName: "Emily Chen",
            customerEmail: "emily.chen@example.com",
            user: "Bob Johnson",
            notes: "Requested size M for all"
        },
        {
            id: 5,
            type: "sale",
            productName: "Blender Pro 500",
            productSku: "BLEND-PRO-500",
            quantity: 1,
            price: 89,
            total: 89,
            date: "2024-06-04",
            time: "11:10",
            customerName: "Sarah Lee",
            customerEmail: "sarah.lee@example.com",
            user: "Alice Smith",
            notes: "First-time customer"
        },
        {
            id: 6,
            type: "sale",
            productName: "Women's Sandals",
            productSku: "SANDAL-WOM-BEIGE",
            quantity: 2,
            price: 45,
            total: 90,
            date: "2024-06-02",
            time: "13:05",
            customerName: "Olivia Brown",
            customerEmail: "olivia.brown@example.com",
            user: "Bob Johnson",
            notes: ""
        },
        {
            id: 7,
            type: "sale",
            productName: "LED Desk Lamp",
            productSku: "LAMP-LED-DESK",
            quantity: 4,
            price: 30,
            total: 120,
            date: "2024-06-03",
            time: "15:50",
            customerName: "David Kim",
            customerEmail: "david.kim@example.com",
            user: "Alice Smith",
            notes: "Bulk order for office"
        },
        {
            id: 8,
            type: "sale",
            productName: "Denim Jeans",
            productSku: "JEANS-DNM-BLU",
            quantity: 2,
            price: 60,
            total: 120,
            date: "2024-06-04",
            time: "17:25",
            customerName: "Sophia Martinez",
            customerEmail: "sophia.martinez@example.com",
            user: "Bob Johnson",
            notes: ""
        },
        // Example of a non-sale transaction (should be filtered out)
        {
            id: 9,
            type: "restock",
            productName: "Apple iPhone 14 Pro",
            productSku: "APL-IP14P-256GB",
            quantity: 10,
            price: 950,
            total: 9500,
            date: "2024-05-30",
            time: "08:00",
            customerName: null,
            customerEmail: null,
            user: "Warehouse",
            notes: "Restocked from supplier"
        }
    ]

    // Filter only sales transactions
    const salesTransactions = transactions.filter((transaction) => transaction.type === "sale")

    const filteredData = salesTransactions.filter((transaction) => {
        const matchesSearch =
            transaction.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.productSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.user.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDate = !selectedDate || transaction.date === selectedDate
        return matchesSearch && matchesDate
    })

    return (
        <div className="bg-surface rounded-2xl border border-custom overflow-x-hidden">
            <div className="p-3 border-b border-custom">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-primary">Sales Transactions</h2>
                        <p className="text-muted text-sm">Track all product sales and customer information</p>
                    </div>

                    <div className="flex flex-wrap-reverse items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search sales..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-custom bg-background text-primary placeholder-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-64"
                            />
                        </div>

                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-custom bg-background text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="block sm:hidden">
                {filteredData.map((transaction) => (
                    <div key={transaction.id} className="p-4 border-b border-custom last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <ShoppingCart className="w-4 h-4 text-blue-400" />
                                    <h3 className="font-medium text-primary">{transaction.productName}</h3>
                                </div>
                                <p className="text-sm text-muted">{transaction.productSku}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <User className="w-3 h-3 text-muted" />
                                    <span className="text-sm text-muted">{transaction.customerName}</span>
                                </div>
                                {transaction.customerEmail && (
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-3 h-3 text-muted" />
                                        <span className="text-sm text-muted">{transaction.customerEmail}</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-primary">{transaction.quantity} units</div>
                                <div className="text-xs text-muted">{transaction.date}</div>
                                <div className="text-xs text-muted">{transaction.time}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted">Sold by: {transaction.user}</span>
                            {transaction.notes && (
                                <span className="text-xs text-muted bg-background px-2 py-1 rounded">{transaction.notes}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-background">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Sold By</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-custom">
                        {filteredData.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-background transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4 text-blue-400" />
                                        <div>
                                            <div className="font-medium text-primary">{transaction.productName}</div>
                                            <div className="text-sm text-muted">{transaction.productSku}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="font-medium text-primary">{transaction.customerName}</div>
                                        {transaction.customerEmail && <div className="text-sm text-muted">{transaction.customerEmail}</div>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-primary">{transaction.quantity} units</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{transaction.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-primary">{transaction.date}</div>
                                    <div className="text-xs text-muted">{transaction.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{transaction.notes || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-muted mx-auto mb-4" />
                    <p className="text-muted">No sales transactions found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}
