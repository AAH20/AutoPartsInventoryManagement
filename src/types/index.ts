export interface CarPart {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryFilters {
  search: string;
  category: string;
  lowStock: boolean;
}

export type SortField = keyof CarPart;
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}