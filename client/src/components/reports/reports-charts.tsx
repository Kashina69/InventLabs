"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useReportStore, ReportFilter } from "@/store/report";
import { useCategoryStore } from "@/store/category";

const COLORS = [
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#6366f1",
  "#f472b6",
];

export default function ReportsCharts() {
  const {
    filter,
    summary,
    distribution,
    isLoading,
    error,
    fetchDistribution,
    setFilter,
    // threshold analysis
    thresholdSummary,
    thresholdAnalysis,
    isLoadingThreshold,
    errorThreshold,
    fetchThresholdAnalysis,
  } = useReportStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Fetch categories if filter is category
  useEffect(() => {
    if (filter === "category") {
      fetchCategories();
    }
  }, [filter, fetchCategories]);

  // Fetch distribution on filter/category change
  useEffect(() => {
    if (filter === "category" && selectedCategoryId) {
      fetchDistribution("category", selectedCategoryId);
    } else if (filter === "product") {
      fetchDistribution("product");
    }
  }, [filter, selectedCategoryId, fetchDistribution]);

  // Fetch threshold analysis on filter/category change
  useEffect(() => {
    if (filter === "category" && selectedCategoryId) {
      fetchThresholdAnalysis("category", selectedCategoryId);
    } else if (filter === "category") {
      fetchThresholdAnalysis("category");
    } else if (filter === "product") {
      fetchThresholdAnalysis("product");
    }
  }, [filter, selectedCategoryId, fetchThresholdAnalysis]);

  // Handle filter dropdown change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as ReportFilter);
    setSelectedCategoryId(null);
  };

  // Handle category dropdown change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(Number(e.target.value));
  };

  const sortedDistribution = useMemo(() => {
    return [...(distribution || [])].sort((a, b) => b.stock - a.stock);
  }, [distribution]);

  const labelKey =
    filter === "product" || (filter === "category" && selectedCategoryId)
      ? "productName"
      : "categoryName";

  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-center mb-4">
        <label className="font-medium">Filter by:</label>
        <select
          className="border bg-surface rounded px-2 py-1"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="product">Products</option>
          <option value="category">Category</option>
        </select>
        {filter === "category" && (
          <select
            className="border rounded bg-surface px-2 py-1 bg"
            value={selectedCategoryId ?? ""}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <>
          {/* Pie Charts: Distribution and Threshold Deficit (side by side, responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Distribution Pie Chart */}
            <div className="bg-surface rounded-2xl p-6 border border-custom flex flex-col items-center">
              <h2 className="text-xl font-semibold text-primary mb-2">Stock Distribution</h2>
              <p className="text-muted text-sm mb-4">
                {filter === "product"
                  ? "Stock by Product"
                  : selectedCategoryId
                  ? `Stock by Product in ${categories.find((c) => c.id === selectedCategoryId)?.name}`
                  : "Stock by Category"}
              </p>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribution}
                      dataKey="stock"
                      nameKey={labelKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    >
                      {distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {summary && (
                <div className="mt-4 text-sm text-muted">
                  Total Products: {summary.totalProducts} | Total Stock: {summary.totalStock}
                </div>
              )}
            </div>
            {/* Threshold Deficit Pie Chart */}
            <div className="bg-surface rounded-2xl p-6 border border-custom flex flex-col items-center">
              <h2 className="text-xl font-semibold text-primary mb-2">Deficit Distribution</h2>
              <p className="text-muted text-sm mb-4">
                {filter === "product" || (filter === "category" && selectedCategoryId)
                  ? "Deficit by Product"
                  : "Deficit by Category"}
              </p>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={thresholdAnalysis}
                      dataKey="deficit"
                      nameKey={labelKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    >
                      {thresholdAnalysis.map((entry, index) => (
                        <Cell key={`cell-threshold-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {thresholdSummary && (
                <div className="mt-4 text-sm text-muted">
                  Total Products: {thresholdSummary.totalProducts} | Products Below Threshold: {thresholdSummary.productsBelowThreshold} | Total Deficit: {thresholdSummary.totalDeficit}
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart for Distribution (horizontal, scrollable if long) */}
          <div className="bg-surface rounded-2xl p-6 border border-custom flex flex-col items-center overflow-x-auto mb-8" style={{ minWidth: 400, maxWidth: "100%" }}>
            <h2 className="text-xl font-semibold text-primary mb-2">Stock Bar Chart</h2>
            <p className="text-muted text-sm mb-4">
              {filter === "product"
                ? "Stock by Product"
                : selectedCategoryId
                ? `Stock by Product in ${categories.find((c) => c.id === selectedCategoryId)?.name}`
                : "Stock by Category"}
            </p>
            <div className="h-64 w-full min-w-[500px]" style={{ minWidth: sortedDistribution.length > 8 ? sortedDistribution.length * 60 : 500 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedDistribution}
                  layout="horizontal"
                  margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <YAxis
                    type="number"
                    dataKey="stock"
                    stroke="var(--text)"
                    fontSize={12}
                  />
                  <XAxis
                    type="category"
                    dataKey={labelKey}
                    stroke="var(--text)"
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--text)",
                    }}
                  />
                  <Bar dataKey="stock" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Threshold Deficit Table (below distribution bar chart) */}
          <div className="bg-surface rounded-2xl p-6 border border-custom overflow-x-auto">
            <h2 className="text-xl font-semibold text-primary mb-2">Threshold Deficit Table</h2>
            {isLoadingThreshold ? (
              <div className="text-center py-10">Loading...</div>
            ) : errorThreshold ? (
              <div className="text-center text-red-500 py-10">{errorThreshold}</div>
            ) : thresholdAnalysis.length === 0 ? (
              <div className="text-center py-10 text-muted">No deficit data available.</div>
            ) : (
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-2 text-left">Product</th>
                    <th className="px-2 py-2 text-left">Category</th>
                    <th className="px-2 py-2 text-right">Current Stock</th>
                    <th className="px-2 py-2 text-right">Threshold</th>
                    <th className="px-2 py-2 text-right">Deficit</th>
                  </tr>
                </thead>
                <tbody>
                  {[...thresholdAnalysis]
                    .sort((a, b) => b.deficit - a.deficit)
                    .map((item) => (
                      <tr key={item.productId} className="border-b last:border-0">
                        <td className="px-2 py-2">{item.productName}</td>
                        <td className="px-2 py-2">{item.categoryName}</td>
                        <td className="px-2 py-2 text-right">{item.currentStock}</td>
                        <td className="px-2 py-2 text-right">{item.threshold}</td>
                        <td className="px-2 py-2 text-right text-red-600 font-semibold">{item.deficit}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {thresholdSummary && (
              <div className="mt-4 text-sm text-muted">
                Total Products: {thresholdSummary.totalProducts} | Products Below Threshold: {thresholdSummary.productsBelowThreshold} | Total Deficit: {thresholdSummary.totalDeficit}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
