import { useState } from 'react';
import { mockTransactions } from '../services/mockData';

export function useTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesDescription = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const searchNumber = searchTerm.replace(',', '.');
    const absAmount = Math.abs(tx.amount);
    const matchesAmount = String(absAmount).includes(searchNumber) || 
                          absAmount.toFixed(2).includes(searchNumber);
    const matchesSearch = matchesDescription || matchesAmount;
    
    const matchesType = selectedType === '' || tx.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredTransactions
  };
}