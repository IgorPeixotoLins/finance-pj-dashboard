import { useState, useMemo } from 'react';
import { type Transaction } from '../types';
import { isScheduled } from './useTransactions';

interface UseStatementProps {
  transactions: Transaction[];
}

export function useStatement({ transactions }: UseStatementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const isValidDateString = (dateStr: string) => {
    return /^[12]\d{3}-\d{2}-\d{2}$/.test(dateStr);
  };

  const filteredBase = useMemo(() => {
    const filtered = transactions.filter((tx) => {
      const matchesDescription = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
      const searchNumber = searchTerm.replace(',', '.');
      const absAmount = Math.abs(tx.amount);
      const matchesAmount = String(absAmount).includes(searchNumber) || absAmount.toFixed(2).includes(searchNumber);
      const matchesSearch = matchesDescription || matchesAmount;

      const matchesType = selectedType === '' || tx.type === selectedType;

      const txDateStr = tx.date.split('T')[0];
      let matchesStartDate = true;
      if (startDate && isValidDateString(startDate)) matchesStartDate = txDateStr >= startDate;

      let matchesEndDate = true;
      if (endDate && isValidDateString(endDate)) matchesEndDate = txDateStr <= endDate;

      return matchesSearch && matchesType && matchesStartDate && matchesEndDate;
    });

    return filtered.sort((a, b) => b.date.localeCompare(a.date));
  }, [searchTerm, selectedType, startDate, endDate, transactions]);

  const liquidatedTransactions = useMemo(() => 
    filteredBase.filter(tx => !isScheduled(tx.status)), 
  [filteredBase]);

  const scheduledTransactions = useMemo(() => 
    filteredBase.filter(tx => isScheduled(tx.status)), 
  [filteredBase]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setStartDate('');
    setEndDate('');
  };

  return {
    searchTerm, setSearchTerm,
    selectedType, setSelectedType,
    startDate, setStartDate,
    endDate, setEndDate,
    clearFilters,
    liquidatedTransactions,
    scheduledTransactions
  };
}