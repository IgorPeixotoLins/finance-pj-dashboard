export type TransactionType = 'Pix' | 'TED' | 'Boleto' | 'Cartão';
export type TransactionStatus = 'Liquidado' | 'Agendado' | 'Cancelado';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
}

export interface AccountSummary {
  availableBalance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  projectedBalance: number;
}