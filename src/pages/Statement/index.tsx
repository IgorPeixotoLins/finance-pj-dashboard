import { TransactionTable } from '../../components/Table';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTransactions } from '../../hooks/useTransactions';
import { Search, X } from 'lucide-react';

const statementStyles = {
    wrapper: "flex flex-col gap-6 w-full max-w-6xl mx-auto",
    headerWrapper: "flex flex-col gap-1",
    title: "text-2xl font-bold text-slate-900 font-display",
    subtitle: "text-slate-500 text-sm",

    filterPanel: "bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4",
    inputsGroup: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1",
    searchFieldWrapper: "flex flex-col gap-1.5",
    typeFieldWrapper: "flex flex-col gap-1.5",

    searchContainer: "relative w-full [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:text-slate-400 [&>svg]:pointer-events-none [&>svg]:w-4 [&>svg]:h-4",
    searchInputPadding: "pl-10",

    selectLabel: "text-sm font-medium text-slate-700 font-sans mb-1.5 block",
    selectFilter: "w-full px-4 py-2 rounded bg-slate-100 border border-transparent focus:bg-white focus:border-slate-500 text-sm font-sans text-slate-900 outline-none transition-all cursor-pointer h-9.5",

    clearBtnWrapper: (isActive: boolean) =>
        `transition-all duration-700 ease-in-out flex items-end overflow-hidden ${isActive
            ? "max-w-[200px] opacity-100 translate-x-0"
            : "max-w-0 opacity-0 -translate-x-4 pointer-events-none"
        }`,

    clearBtn: "h-9.5 gap-2 whitespace-nowrap [&>svg]:w-4 [&>svg]:h-4"
};

export function Statement() {
    const {
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        clearFilters,
        filteredTransactions
    } = useTransactions();

    const hasActiveFilters = searchTerm !== '' || selectedType !== '' || startDate !== '' || endDate !== '';

    return (
        <div className={statementStyles.wrapper}>

            <div className={statementStyles.headerWrapper}>
                <h1 className={statementStyles.title}>Extrato Consolidado</h1>
                <p className={statementStyles.subtitle}>Consulte e filtre o histórico completo das suas movimentações financeiras.</p>
            </div>

            <div className={statementStyles.filterPanel}>
                <div className={statementStyles.inputsGroup}>

                    <div className={statementStyles.searchFieldWrapper}>
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

                    <Input
                        label="De"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <Input
                        label="Até"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                </div>

                <div className={statementStyles.clearBtnWrapper(hasActiveFilters)}>
                    <Button
                        variant="secondary"
                        onClick={clearFilters}
                        className={statementStyles.clearBtn}
                    >
                        <X />
                        Limpar Filtros
                    </Button>
                </div>

            </div>

            <TransactionTable transactions={filteredTransactions} />

        </div>
    );
}