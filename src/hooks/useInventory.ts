import { useState, useMemo } from 'react';
import { CarPart, InventoryFilters, SortConfig } from '../types';
import { mockData, generatePartNumber } from '../utils/inventory';

export const useInventory = () => {
  const [parts, setParts] = useState<CarPart[]>(mockData);
  const [filters, setFilters] = useState<InventoryFilters>({
    search: '',
    category: '',
    lowStock: false,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'updatedAt',
    direction: 'desc',
  });

  const filteredAndSortedParts = useMemo(() => {
    let filtered = [...parts];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(part =>
        part.name.toLowerCase().includes(searchLower) ||
        part.partNumber.toLowerCase().includes(searchLower) ||
        part.supplier.toLowerCase().includes(searchLower) ||
        part.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(part => part.category === filters.category);
    }

    // Apply low stock filter
    if (filters.lowStock) {
      filtered = filtered.filter(part => part.quantity <= part.minQuantity);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [parts, filters, sortConfig]);

  const addPart = (partData: Omit<CarPart, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPart: CarPart = {
      ...partData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setParts(prev => [...prev, newPart]);
  };

  const updatePart = (id: string, partData: Partial<CarPart>) => {
    setParts(prev =>
      prev.map(part =>
        part.id === id
          ? { ...part, ...partData, updatedAt: new Date() }
          : part
      )
    );
  };

  const deletePart = (id: string) => {
    setParts(prev => prev.filter(part => part.id !== id));
  };

  const getPartById = (id: string): CarPart | undefined => {
    return parts.find(part => part.id === id);
  };

  const handleSort = (field: SortConfig['field']) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    parts: filteredAndSortedParts,
    allParts: parts,
    filters,
    setFilters,
    sortConfig,
    addPart,
    updatePart,
    deletePart,
    getPartById,
    handleSort,
    generatePartNumber,
  };
};