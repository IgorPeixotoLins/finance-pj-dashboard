import { mockTransactions } from '../services/mockData';
import { formatCurrency } from '../utils/formatCurrency';

export const isScheduled = (status?: string) => {
    if (!status) return false;
    return status.trim().toLowerCase() === 'agendado';
};

export function calculateCurrentBalance() {
    const totalIncomes = mockTransactions
        .filter((tx) => tx.amount > 0 && !isScheduled(tx.status))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpenses = mockTransactions
        .filter((tx) => tx.amount < 0 && !isScheduled(tx.status))
        .reduce((acc, tx) => acc + tx.amount, 0);

    return totalIncomes + totalExpenses;
}

export function calculateScheduledAmount() {
    return mockTransactions
        .filter((tx) => isScheduled(tx.status))
        .reduce((acc, tx) => acc + tx.amount, 0);
}

export function useTransactions() {
    const currentBalance = calculateCurrentBalance();
    const scheduledAmount = calculateScheduledAmount();
    const projectedBalance = currentBalance + scheduledAmount;

    const totalIncomes = mockTransactions
        .filter((tx) => tx.amount > 0 && !isScheduled(tx.status))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpenses = mockTransactions
        .filter((tx) => tx.amount < 0 && !isScheduled(tx.status))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const activeTransactions = mockTransactions.filter(tx => !isScheduled(tx.status));

    return {
        allTransactions: mockTransactions,
        dashboardTransactions: activeTransactions,
        currentBalance,
        summary: {
            balance: formatCurrency(currentBalance),
            incomes: formatCurrency(totalIncomes),
            expenses: formatCurrency(totalExpenses),
            projected: formatCurrency(projectedBalance)
        }
    };
}