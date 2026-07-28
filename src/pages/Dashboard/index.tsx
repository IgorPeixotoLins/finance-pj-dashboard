import { TransactionTable } from '../../components/Table';
import { mockTransactions } from '../../services/mockData';

const cardStyles = {
  container: "bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-2",
  title: "text-sm font-medium text-slate-500 font-sans",
  value: "text-3xl font-bold text-slate-900 font-display tracking-tight",
  trendBase: "text-xs font-mono font-medium",
  trendUp: "text-emerald-600",
  trendDown: "text-red-500"
};

function SummaryCard({ title, amount, trend, trendUp }: { title: string, amount: string, trend: string, trendUp: boolean }) {
  return (
    <div className={cardStyles.container}>
      <h3 className={cardStyles.title}>{title}</h3>
      <span className={cardStyles.value}>{amount}</span>
      <span className={`${cardStyles.trendBase} ${trendUp ? cardStyles.trendUp : cardStyles.trendDown}`}>
        {trendUp ? '↑' : '↓'} {trend} este mês
      </span>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Resumo Financeiro</h1>
          <p className="text-slate-500 text-sm mt-1">Acompanhe o fluxo de caixa da TechCorp Soluções.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Saldo Disponível" amount="R$ 145.230,00" trend="+ 2.4%" trendUp={true} />
        <SummaryCard title="Entradas (Mês)" amount="R$ 45.000,00" trend="+ 12.5%" trendUp={true} />
        <SummaryCard title="Saídas (Mês)" amount="R$ 12.350,00" trend="- 4.1%" trendUp={false} />
        <SummaryCard title="Saldo Projetado" amount="R$ 177.880,00" trend="+ 5.2%" trendUp={true} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 font-display mb-4">Últimas Transações</h2>
        <TransactionTable transactions={mockTransactions} />
      </div>

    </div>
  );
}