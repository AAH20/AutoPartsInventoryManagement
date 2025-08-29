import { CarPart } from '../types';

export const mockData: CarPart[] = [
  {
    id: '1',
    partNumber: 'BP001',
    name: 'Brake Pad Set',
    category: 'Brakes',
    description: 'High-performance ceramic brake pads for front wheels',
    quantity: 25,
    minQuantity: 10,
    price: 89.99,
    supplier: 'BrakeTech Solutions',
    location: 'A1-B2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    partNumber: 'ENG045',
    name: 'Oil Filter',
    category: 'Engine',
    description: 'Premium oil filter for 2.0L engines',
    quantity: 8,
    minQuantity: 15,
    price: 24.99,
    supplier: 'FilterMax Corp',
    location: 'B3-C1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    partNumber: 'SUS012',
    name: 'Shock Absorber',
    category: 'Suspension',
    description: 'Heavy-duty shock absorber for rear suspension',
    quantity: 12,
    minQuantity: 5,
    price: 156.50,
    supplier: 'SuspensionPro',
    location: 'C2-A3',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    partNumber: 'ELC098',
    name: 'Headlight Bulb',
    category: 'Electrical',
    description: 'LED headlight bulb H7 type',
    quantity: 45,
    minQuantity: 20,
    price: 32.99,
    supplier: 'LightTech Industries',
    location: 'D1-A1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22')
  }
];

export const categories = [
  'Brakes',
  'Engine',
  'Suspension',
  'Electrical',
  'Transmission',
  'Body',
  'Interior',
  'Exhaust'
];

export const generatePartNumber = (): string => {
  const prefix = ['BP', 'ENG', 'SUS', 'ELC', 'TRN', 'BDY', 'INT', 'EXH'];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${randomPrefix}${number}`;
};

export const isLowStock = (part: CarPart): boolean => {
  return part.quantity <= part.minQuantity;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};