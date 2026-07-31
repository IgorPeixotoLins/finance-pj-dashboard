import { type Transaction } from '../types';

export let mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Recebimento Cliente - Projeto Alpha',
    amount: 12500.00,
    date: '2026-07-28',
    category: 'Receita',
    type: 'TED',
    status: 'Liquidado',
  },
  {
    id: '2',
    description: 'Pagamento Fornecedor AWS',
    amount: -1420.50,
    date: '2026-07-29',
    category: 'Despesa',
    type: 'Boleto',
    status: 'Liquidado',
  },
  {
    id: '3',
    description: 'Assinatura Ferramentas de Design',
    amount: -350.00,
    date: '2026-07-30',
    category: 'Despesa',
    type: 'Cartão',
    status: 'Liquidado',
  },
];

export function addTransaction(newTx: Transaction) {
  mockTransactions = [newTx, ...mockTransactions];
}