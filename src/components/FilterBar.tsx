import React from 'react';
import { Filter, AlertTriangle } from 'lucide-react';
import { InventoryFilters } from '../types';
import { categories } from '../utils/inventory';

interface FilterBarProps {
  filters: InventoryFilters;
  onFiltersChange: (filters: InventoryFilters) => void;
  lowStockCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  lowStockCount,
}) => {
  const updateFilter = (key: keyof InventoryFilters, value: string | boolean) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.lowStock}
                onChange={(e) => updateFilter('lowStock', e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Low Stock Only</span>
            </label>
          </div>

          {lowStockCount > 0 && (
            <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} low in stock
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};