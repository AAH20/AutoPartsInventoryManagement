import React, { useState } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { StatsCards } from './components/StatsCards';
import { PartTable } from './components/PartTable';
import { PartForm } from './components/PartForm';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useInventory } from './hooks/useInventory';
import { CarPart } from './types';
import { isLowStock } from './utils/inventory';

function App() {
  const {
    parts,
    allParts,
    filters,
    setFilters,
    sortConfig,
    addPart,
    updatePart,
    deletePart,
    handleSort,
    generatePartNumber,
  } = useInventory();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<CarPart | undefined>();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const lowStockCount = allParts.filter(isLowStock).length;

  const handleAddClick = () => {
    setEditingPart(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (part: CarPart) => {
    setEditingPart(part);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (partData: Omit<CarPart, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPart) {
      updatePart(editingPart.id, partData);
    } else {
      addPart(partData);
    }
    setIsFormOpen(false);
    setEditingPart(undefined);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deletePart(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddClick={handleAddClick}
        searchValue={filters.search}
        onSearchChange={handleSearchChange}
      />

      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        lowStockCount={lowStockCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCards parts={allParts} />
          
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Parts Inventory ({parts.length} items)
              </h2>
            </div>
            
            <PartTable
              parts={parts}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </main>

      <PartForm
        part={editingPart}
        onSubmit={handleFormSubmit}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        generatePartNumber={generatePartNumber}
      />

      <ConfirmDialog
        isOpen={deleteConfirmId !== null}
        title="Delete Part"
        message="Are you sure you want to delete this part from the inventory? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}

export default App;