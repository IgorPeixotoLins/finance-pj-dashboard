import { type Transaction, type AccountSummary } from '../types';

export const mockSummary: AccountSummary = {
  availableBalance: 145230.00,
  monthlyInflow: 45000.00,
  monthlyOutflow: 12350.00,
  projectedBalance: 177880.00,
};

export const mockTransactions: Transaction[] = [
  { 
    id: 'tx-001', 
    date: '2023-10-25', 
    description: 'Recebimento Cliente ABC', 
    type: 'Pix', 
    amount: 15000.50, 
    status: 'Liquidado' 
  },
  { 
    id: 'tx-002', 
    date: '2023-10-24', 
    description: 'Pagamento Fornecedor XYZ', 
    type: 'TED', 
    amount: -3500.00, 
    status: 'Liquidado' 
  },
  { 
    id: 'tx-003', 
    date: '2023-10-23', 
    description: 'Impostos Mensais (DAS)', 
    type: 'Boleto', 
    amount: -1250.75, 
    status: 'Agendado' 
  },
  { 
    id: 'tx-004', 
    date: '2023-10-22', 
    description: 'Recebimento Cliente DEF', 
    type: 'Pix', 
    amount: 8400.00, 
    status: 'Liquidado' 
  },
  { 
    id: 'tx-005', 
    date: '2023-10-21', 
    description: 'Compra Equipamentos', 
    type: 'Cartão', 
    amount: -4200.00, 
    status: 'Liquidado' 
  }
];