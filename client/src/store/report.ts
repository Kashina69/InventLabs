import { create } from "zustand";
import api from "@/config/axios";

interface DistributionItem {
  productId: number;
  productName: string;
  stock: number;
  categoryId: number;
  categoryName: string;
}

interface ReportSummary {
  totalProducts: number;
  totalStock: number;
}

export type ReportFilter = "product" | "category";

interface ThresholdAnalysisItem {
  productId: number;
  productName: string;
  currentStock: number;
  threshold: number;
  deficit: number;
  categoryId: number;
  categoryName: string;
}

interface ThresholdSummary {
  totalProducts: number;
  productsBelowThreshold: number;
  totalDeficit: number;
}

interface ReportState {
  filter: ReportFilter;
  summary: ReportSummary | null;
  distribution: DistributionItem[];
  isLoading: boolean;
  error: string | null;
  // Threshold analysis state
  thresholdSummary: ThresholdSummary | null;
  thresholdAnalysis: ThresholdAnalysisItem[];
  isLoadingThreshold: boolean;
  errorThreshold: string | null;
}

interface ReportActions {
  fetchDistribution: (filter: ReportFilter, categoryId?: number) => Promise<void>;
  setFilter: (filter: ReportFilter) => void;
  // Threshold analysis fetch
  fetchThresholdAnalysis: (filter: ReportFilter, categoryId?: number) => Promise<void>;
}

type ReportStore = ReportState & ReportActions;

export const useReportStore = create<ReportStore>((set) => ({
  filter: "product",
  summary: null,
  distribution: [],
  isLoading: false,
  error: null,
  // Threshold analysis state
  thresholdSummary: null,
  thresholdAnalysis: [],
  isLoadingThreshold: false,
  errorThreshold: null,

  fetchDistribution: async (filter, categoryId) => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);
      if (filter === "category" && categoryId) {
        params.append("categoryId", categoryId.toString());
      }
      const response = await api.get(`/analytics/distribution?${params.toString()}`);
      set({
        summary: response.data.summary,
        distribution: response.data.distribution,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch report distribution",
        isLoading: false,
      });
    }
  },

  setFilter: (filter) => set({ filter }),

  fetchThresholdAnalysis: async (filter, categoryId) => {
    set({ isLoadingThreshold: true, errorThreshold: null });
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);
      if (filter === "category" && categoryId) {
        params.append("categoryId", categoryId.toString());
      }
      const response = await api.get(`/analytics/threshold?${params.toString()}`);
      set({
        thresholdSummary: response.data.summary,
        thresholdAnalysis: response.data.thresholdAnalysis,
        isLoadingThreshold: false,
      });
    } catch (error: any) {
      set({
        errorThreshold: error.response?.data?.message || "Failed to fetch threshold analysis",
        isLoadingThreshold: false,
      });
    }
  },
})); 