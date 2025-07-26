export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'staff';
  }
  