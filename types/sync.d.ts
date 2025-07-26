import { ProductItem } from './product';
import { InventoryLogItem } from './inventoryLog';

export interface SyncPayload {
  products?: ProductItem[];
  logs?: InventoryLogItem[];
}
