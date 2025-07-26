export interface ProductItem {
    id: number;
    sku: string;
    name: string;
    barcode: string;
    category: string;
    stock: number;
    threshold: number;
    expiryDate: string | null;
    createdAt: string;
    updatedAt: string;
  }
  