import { useState } from 'react';
import { mockTransactions } from '../services/mockData';
import { formatCurrency } from '../utils/formatCurrency';

export function useTransactions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const isDateFullyTyped = (dateStr: string) => {
        return /^[2-9]\d{3}-\d{2}-\d{2}$/.test(dateStr);
    };

    const filteredTransactions = mockTransactions.filter((tx) => {
        const matchesDescription = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
        const searchNumber = searchTerm.replace(',', '.');
        const absAmount = Math.abs(tx.amount);
        const matchesAmount = String(absAmount).includes(searchNumber) ||
            absAmount.toFixed(2).includes(searchNumber);

        const matchesSearch = matchesDescription || matchesAmount;

        const matchesType = selectedType === '' || tx.type === selectedType;

        const txDate = tx.date.split('T')[0];
        const matchesStartDate = isDateFullyTyped(startDate) ? txDate >= startDate : true;
        const matchesEndDate = isDateFullyTyped(endDate) ? txDate <= endDate : true;

        return matchesSearch && matchesType && matchesStartDate && matchesEndDate;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedType('');
        setStartDate('');
        setEndDate('');
    };

    const totalIncomes = mockTransactions
        .filter((tx) => tx.amount > 0)
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpenses = mockTransactions
        .filter((tx) => tx.amount < 0)
        .reduce((acc, tx) => acc + tx.amount, 0);

    const currentBalance = totalIncomes + totalExpenses;

    const scheduledAmount = mockTransactions
        .filter((tx) => tx.status === 'Agendado')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const projectedBalance = currentBalance + scheduledAmount;

    return {
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        clearFilters,
        filteredTransactions,
        summary: {
            balance: formatCurrency(currentBalance),
            incomes: formatCurrency(totalIncomes),
            expenses: formatCurrency(totalExpenses),
            projected: formatCurrency(projectedBalance)
        }
    };
}