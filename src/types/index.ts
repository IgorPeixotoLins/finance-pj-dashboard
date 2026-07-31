export type TransactionType = 'TED' | 'Pix' | 'Boleto' | 'Cartão' | 'Outros';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
  type?: TransactionType;
  status?: 'Liquidado' | 'Agendado' | 'Cancelado';
}