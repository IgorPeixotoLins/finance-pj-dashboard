import { useState } from 'react';
import { TransactionTable } from '../../components/Table';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTransactions } from '../../hooks/useTransactions';
import { useStatement } from '../../hooks/useStatement';
import { Search, X, History, CalendarClock } from 'lucide-react';

const statementStyles = {
    wrapper: "flex flex-col gap-6 w-full max-w-6xl mx-auto",
    headerWrapper: "flex flex-col gap-1",
    title: "text-2xl font-bold text-slate-900 font-display",
    subtitle: "text-slate-500 text-sm",

    tabsWrapper: "flex items-center gap-1 border-b border-slate-200 mt-2",
    tabBtn: (isActive: boolean) => `
        flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative
        ${isActive 
            ? "text-slate-900 border-b-2 border-slate-900" 
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
        }
    `,
    tabBadge: (isActive: boolean) => `
        ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold
        ${isActive ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}
    `,

    filterPanel: "bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4",
    inputsGroup: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1",
    selectLabel: "text-sm font-medium text-slate-700 font-sans mb-1.5 block",
    selectFilter: "w-full px-4 py-2 rounded bg-slate-100 border border-transparent focus:bg-white focus:border-slate-500 text-sm font-sans text-slate-900 outline-none transition-all cursor-pointer h-9.5",
    
    searchContainer: "relative w-full [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:text-slate-400 [&>svg]:pointer-events-none [&>svg]:w-4 [&>svg]:h-4",
    searchInputPadding: "pl-10",

    clearBtnWrapper: (isActive: boolean) => `
        transition-all duration-500 ease-in-out flex items-end overflow-hidden 
        ${isActive ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"}
    `,
    clearBtn: "h-9.5 gap-2 whitespace-nowrap",

    emptyState: "text-center text-slate-400 py-10 text-sm italic"
};

export function Statement() {
    const { allTransactions } = useTransactions();
    const [activeTab, setActiveTab] = useState<'history' | 'scheduled'>('history');

    const {
        searchTerm, setSearchTerm,
        selectedType, setSelectedType,
        startDate, setStartDate,
        endDate, setEndDate,
        clearFilters,
        liquidatedTransactions,
        scheduledTransactions
    } = useStatement({ transactions: allTransactions });

    const hasActiveFilters = searchTerm !== '' || selectedType !== '' || startDate !== '' || endDate !== '';

    return (
        <div className={statementStyles.wrapper}>
            <div className={statementStyles.headerWrapper}>
                <h1 className={statementStyles.title}>Extrato Consolidado</h1>
                <p className={statementStyles.subtitle}>Gerencie suas movimentações efetivadas e compromissos futuros.</p>
            </div>

            <div className={statementStyles.tabsWrapper}>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={statementStyles.tabBtn(activeTab === 'history')}
                >
                    <History size={18} />
                    Movimentações
                    <span className={statementStyles.tabBadge(activeTab === 'history')}>
                        {liquidatedTransactions.length}
                    </span>
                </button>
                <button 
                    onClick={() => setActiveTab('scheduled')}
                    className={statementStyles.tabBtn(activeTab === 'scheduled')}
                >
                    <CalendarClock size={18} />
                    Agendamentos
                    <span className={statementStyles.tabBadge(activeTab === 'scheduled')}>
                        {scheduledTransactions.length}
                    </span>
                </button>
            </div>

            <div className={statementStyles.filterPanel}>
                <div className={statementStyles.inputsGroup}>
                    <div>
                        <span className={statementStyles.selectLabel}>Buscar</span>
                        <div className={statementStyles.searchContainer}>
                            <Search />
                            <Input
                                placeholder="Descrição ou valor..."
                                className={statementStyles.searchInputPadding}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={statementStyles.selectLabel}>Tipo</label>
                        <select
                            className={statementStyles.selectFilter}
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

                    <Input label="De" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <Input label="Até" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className={statementStyles.clearBtnWrapper(hasActiveFilters)}>
                    <Button variant="secondary" onClick={clearFilters} className={statementStyles.clearBtn}>
                        <X size={16} /> Limpar
                    </Button>
                </div>
            </div>

            <TransactionTable 
                transactions={activeTab === 'history' ? liquidatedTransactions : scheduledTransactions} 
            />

            {activeTab === 'scheduled' && scheduledTransactions.length === 0 && (
                <p className={statementStyles.emptyState}>
                    Não existem lançamentos agendados para os filtros selecionados.
                </p>
            )}
        </div>
    );
}