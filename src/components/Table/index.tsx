import { formatCurrency } from '../../utils/formatCurrency';
import { type Transaction } from '../../types';

const styles = {
  container: "bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden",
  tableWrapper: "overflow-x-auto",
  table: "w-full text-left border-collapse",
  
  header: "px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 font-sans",
  headerRight: "px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 font-sans text-right",

  row: "border-b border-slate-100 hover:bg-slate-50 transition-colors",

  cellBase: "px-6 py-4 text-sm font-sans whitespace-nowrap",
  cellDescription: "px-6 py-4 text-sm font-sans whitespace-nowrap font-medium text-slate-900",

  amountCell: (amount: number) => 
    `px-6 py-4 text-sm text-right font-mono font-medium whitespace-nowrap ${
      amount > 0 ? "text-emerald-600" : "text-slate-900"
    }`,
  
  amountBase: "px-6 py-4 text-sm text-right font-mono font-medium whitespace-nowrap",
  amountPositive: "text-emerald-600",
  amountNegative: "text-slate-900",
  
  badgeBase: "px-2.5 py-1 rounded-full text-xs font-medium inline-block",
  status: {
    Liquidado: "bg-emerald-100 text-emerald-700",
    Agendado: "bg-amber-100 text-amber-700",
    Cancelado: "bg-red-100 text-red-700"
  }
};

interface TableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>Data</th>
              <th className={styles.header}>Descrição</th>
              <th className={styles.header}>Tipo</th>
              <th className={styles.header}>Status</th>
              <th className={styles.headerRight}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className={styles.row}>
                
                <td className={styles.cellBase}>
                  {new Date(tx.date).toLocaleDateString('pt-BR')}
                </td>
                
                <td className={styles.cellDescription}>
                  {tx.description}
                </td>
                
                <td className={styles.cellBase}>
                  {tx.type}
                </td>
                
                <td className={styles.cellBase}>
                  <span className={`${styles.badgeBase} ${styles.status[tx.status || 'Liquidado']}`}>
                    {tx.status || 'Liquidado'}
                  </span>
                </td>
                
                <td className={styles.amountCell(tx.amount)}>
                  {formatCurrency(tx.amount)}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}