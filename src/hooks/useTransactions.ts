import { useState } from 'react';
import { mockTransactions } from '../services/mockData';
import { formatCurrency } from '../utils/formatCurrency';

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
        filteredTransactions,
        summary: {
            balance: formatCurrency(currentBalance),
            incomes: formatCurrency(totalIncomes),
            expenses: formatCurrency(totalExpenses),
            projected: formatCurrency(projectedBalance)
        }
    };
}