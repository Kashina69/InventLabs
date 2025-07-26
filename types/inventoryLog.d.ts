export type InventoryActionType = 'ADD' | 'REMOVE' | 'RETURN' | 'SALE';

export interface InventoryLogItem {
  id: number;
  productId: number;
  quantity: number;
  type: InventoryActionType;
  userId: number;
  timestamp: string;
}
