import { mockTransactions } from '../services/mockData';
import { formatCurrency } from '../utils/formatCurrency';

export function useTransactions() {
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
        allTransactions: mockTransactions,
        summary: {
            balance: formatCurrency(currentBalance),
            incomes: formatCurrency(totalIncomes),
            expenses: formatCurrency(totalExpenses),
            projected: formatCurrency(projectedBalance)
        }
    };
}