import { formatCurrency } from '../../utils/formatCurrency';
import { type Transaction } from '../../types';

const styles = {
    container: "bg-white rounded-lg shadow-sm border-sm border border-slate-200 overflow-hiden",
    header: "px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 font-sans",
    row: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
    cell: "px-6 py-4 text-sm text-slate-700 font-sans whitespace-nowrap",
    cellAmount: "px-6 py-4 text-sm text-right font-mono font-medium whitespace-nowrap",
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
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className={styles.header}>Data</th>
                            <th className={styles.header}>Descrição</th>
                            <th className={styles.header}>Tipo</th>
                            <th className={styles.header}>Status</th>
                            <th className={`${styles.header} text-right`}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className={styles.row}>
                                <td className={styles.cell}>
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className={`${styles.cell} font-medium text-slate-900`}>
                                    {tx.description}
                                </td>
                                <td className={styles.cell}>{tx.type}</td>
                                <td className={styles.cell}>
                                    <span className={`${styles.badgeBase} ${styles.status[tx.status]}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className={`${styles.cellAmount} ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
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