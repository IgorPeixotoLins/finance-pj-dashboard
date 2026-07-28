import { type ReactNode } from 'react';
import { TransactionTable } from '../../components/Table';
import { Input } from '../../components/Input';
import { useTransactions } from '../../hooks/useTransactions'; // Importamos o hook
import { Wallet, ArrowDownToLine, ArrowUpFromLine, LineChart, Search } from 'lucide-react';

const dashboardStyles = {
  wrapper: "flex flex-col gap-8 w-full max-w-6xl mx-auto",
  headerWrapper: "flex items-center justify-between",
  title: "text-2xl font-bold text-slate-900 font-display",
  subtitle: "text-slate-500 text-sm mt-1",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",

  tableHeader: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4",
  sectionTitle: "text-lg font-bold text-slate-900 font-display",
  filterControls: "flex items-center gap-3 w-full sm:w-auto",
  searchContainer: "relative w-full sm:w-64",
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none",
  searchInputPadding: "pl-10",
  selectFilter: "px-3 py-2 rounded bg-slate-100 border border-transparent focus:bg-white focus:border-slate-500 text-sm font-sans text-slate-700 outline-none transition-all cursor-pointer"
};

const cardStyles = {
  container: "bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-2",
  header: "flex items-center justify-between",
  title: "text-sm font-medium text-slate-500 font-sans",
  iconWrapper: "p-2 bg-slate-50 rounded-md text-slate-400 [&>svg]:w-5 [&>svg]:h-5",
  value: "text-3xl font-bold text-slate-900 font-display tracking-tight",
  trendBase: "text-xs font-mono font-medium",
  trendUp: "text-emerald-600",
  trendDown: "text-red-500"
};

interface CardProps {
  title: string;
  amount: string;
  trend: string;
  trendUp: boolean;
  icon: ReactNode;
}

function SummaryCard({ title, amount, trend, trendUp, icon }: CardProps) {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.header}>
        <h3 className={cardStyles.title}>{title}</h3>
        <div className={cardStyles.iconWrapper}>
          {icon}
        </div>
      </div>
      <span className={cardStyles.value}>{amount}</span>
      <span className={`${cardStyles.trendBase} ${trendUp ? cardStyles.trendUp : cardStyles.trendDown}`}>
        {trendUp ? '↑' : '↓'} {trend} este mês
      </span>
    </div>
  );
}

export function Dashboard() {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredTransactions,
    summary
  } = useTransactions();

  return (
    <div className={dashboardStyles.wrapper}>

      <div className={dashboardStyles.headerWrapper}>
        <div>
          <h1 className={dashboardStyles.title}>Resumo Financeiro</h1>
          <p className={dashboardStyles.subtitle}>Acompanhe o fluxo de caixa da TechCorp Soluções.</p>
        </div>
      </div>

      <div className={dashboardStyles.grid}>
        <SummaryCard 
          title="Saldo Disponível" 
          amount={summary.balance} 
          trend="+ 2.4%" 
          trendUp={true} 
          icon={<Wallet />} /* Sem size={20}! */
        />
        <SummaryCard 
          title="Entradas (Mês)" 
          amount={summary.incomes} 
          trend="+ 12.5%" 
          trendUp={true} 
          icon={<ArrowDownToLine />} 
        />
        <SummaryCard 
          title="Saídas (Mês)" 
          amount={summary.expenses} 
          trend="- 4.1%" 
          trendUp={false} 
          icon={<ArrowUpFromLine />} 
        />
        <SummaryCard 
          title="Saldo Projetado" 
          amount={summary.projected} 
          trend="+ 5.2%" 
          trendUp={true} 
          icon={<LineChart />} 
        />
      </div>

      <div>
        <div className={dashboardStyles.tableHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Últimas Transações</h2>
          
          <div className={dashboardStyles.filterControls}>
            <div className={dashboardStyles.searchContainer}>
              <Search size={16} className={dashboardStyles.searchIcon} />
              <Input 
                placeholder="Buscar por descrição ou valor..." 
                className={dashboardStyles.searchInputPadding}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className={dashboardStyles.selectFilter}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="Pix">Pix</option>
              <option value="TED">TED</option>
              <option value="Boleto">Boleto</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>
        </div>

        <TransactionTable transactions={filteredTransactions} />
      </div>

    </div>
  );
}