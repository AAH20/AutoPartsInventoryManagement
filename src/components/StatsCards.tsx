import React from 'react';
import { Package, TrendingDown, DollarSign, Warehouse } from 'lucide-react';
import { CarPart } from '../types';
import { isLowStock, formatCurrency } from '../utils/inventory';

interface StatsCardsProps {
  parts: CarPart[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ parts }) => {
  const totalParts = parts.length;
  const lowStockParts = parts.filter(isLowStock).length;
  const totalValue = parts.reduce((sum, part) => sum + (part.quantity * part.price), 0);
  const uniqueCategories = new Set(parts.map(part => part.category)).size;

  const stats = [
    {
      title: 'Total Parts',
      value: totalParts.toLocaleString(),
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Low Stock Items',
      value: lowStockParts.toString(),
      icon: TrendingDown,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      title: 'Total Inventory Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Categories',
      value: uniqueCategories.toString(),
      icon: Warehouse,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};