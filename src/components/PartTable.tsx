import React from 'react';
import { Edit, Trash2, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react';
import { CarPart, SortConfig } from '../types';
import { formatCurrency, formatDate, isLowStock } from '../utils/inventory';

interface PartTableProps {
  parts: CarPart[];
  sortConfig: SortConfig;
  onSort: (field: SortConfig['field']) => void;
  onEdit: (part: CarPart) => void;
  onDelete: (id: string) => void;
}

export const PartTable: React.FC<PartTableProps> = ({
  parts,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}) => {
  const getSortIcon = (field: SortConfig['field']) => {
    if (sortConfig.field !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-300" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-blue-600" />
      : <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  const SortableHeader: React.FC<{ field: SortConfig['field']; children: React.ReactNode }> = ({
    field,
    children,
  }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 select-none transition-colors duration-150"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="partNumber">Part Number</SortableHeader>
              <SortableHeader field="name">Name</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="quantity">Quantity</SortableHeader>
              <SortableHeader field="price">Price</SortableHeader>
              <SortableHeader field="supplier">Supplier</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="updatedAt">Last Updated</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parts.map((part) => (
              <tr
                key={part.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono font-medium text-gray-900">
                    {part.partNumber}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {part.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {part.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {part.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      isLowStock(part) ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {part.quantity}
                    </span>
                    {isLowStock(part) && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Min: {part.minQuantity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(part.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {part.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {part.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(part.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(part)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(part.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-150"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {parts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No parts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};