import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTransfer } from '../../hooks/useTransfer';
import { Send, ArrowRightLeft } from 'lucide-react';

const transferStyles = {
    wrapper: "flex flex-col gap-6 w-full max-w-3xl mx-auto",
    headerWrapper: "flex flex-col gap-1",
    title: "text-2xl font-bold text-slate-900 font-display",
    subtitle: "text-slate-500 text-sm",

    formCard: "bg-white p-6 md:p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-6",
    formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    fullWidth: "col-span-1 md:col-span-2",

    tedFieldsGrid: "grid grid-cols-1 md:grid-cols-12 gap-4 col-span-1 md:col-span-2",
    bankCol: "md:col-span-6",
    agencyCol: "md:col-span-2",
    accountCol: "md:col-span-4",

    balanceBadge: "text-xs font-sans font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md mt-1 block w-fit",

    bankBadge: (status: 'loading' | 'error' | 'success') => {
        const base = "text-xs font-sans font-medium px-2.5 py-1 rounded-md mt-1 block w-fit transition-colors";
        if (status === 'loading') return `${base} text-amber-700 bg-amber-50 border border-amber-100`;
        if (status === 'error') return `${base} text-red-700 bg-red-50 border border-red-100`;
        return `${base} text-emerald-700 bg-emerald-50 border border-emerald-100`;
    },
    errorAlert: "bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3 text-sm font-sans [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-red-500",

    typeSelector: "flex p-1 bg-slate-100 rounded-lg w-full md:w-fit mb-2",
    typeBtnWrapper: (isActive: boolean) =>
        `flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
        }`,

    recurringBox: "col-span-1 md:col-span-2 p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex flex-col gap-4",
    recurringCheckboxLabel: "flex items-center gap-3 cursor-pointer select-none",
    recurringGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300",
    selectField: "w-full px-4 py-2 rounded bg-white border border-slate-300 focus:border-slate-500 text-sm font-sans text-slate-900 outline-none h-10 cursor-pointer",

    footer: "flex justify-end pt-4 border-t border-slate-100 mt-2",
    submitBtn: "gap-2 [&>svg]:w-4 [&>svg]:h-4"
};

export function Transfer() {
    const {
        transferType,
        setTransferType,
        pixKey,
        handleKeyChange,
        bank,
        setBank,
        detectedBankName,
        isSearchingBank,
        agency,
        setAgency,
        account,
        setAccount,
        handleAccountBlur,
        amount,
        setAmount,
        description,
        setDescription,
        date,
        setDate,
        isRecurring,
        setIsRecurring,
        recurrenceInterval,
        setRecurrenceInterval,
        recurrenceCount,
        setRecurrenceCount,
        handleSubmit,
        balanceLabel
    } = useTransfer();

    return (
        <div className={transferStyles.wrapper}>

            <div className={transferStyles.headerWrapper}>
                <h1 className={transferStyles.title}>Pix e Transferências</h1>
                <p className={transferStyles.subtitle}>Envie pagamentos com rapidez e segurança.</p>
            </div>

            <div className={transferStyles.formCard}>

                <div className={transferStyles.typeSelector}>
                    <button
                        type="button"
                        onClick={() => setTransferType('pix')}
                        className={transferStyles.typeBtnWrapper(transferType === 'pix')}
                    >
                        Pix
                    </button>
                    <button
                        type="button"
                        onClick={() => setTransferType('ted')}
                        className={transferStyles.typeBtnWrapper(transferType === 'ted')}
                    >
                        TED
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={transferStyles.formGrid}>

                    <div className={transferStyles.fullWidth}>
                        <Input
                            label={transferType === 'pix' ? "Chave Pix (CPF, CNPJ, E-mail, Celular ou Aleatória)" : "CPF/CNPJ do Favorecido"}
                            placeholder={transferType === 'pix' ? "Digite a chave Pix..." : "000.000.000-00"}
                            value={pixKey}
                            onChange={(e) => handleKeyChange(e.target.value)}
                            required
                        />
                    </div>

                    {transferType === 'ted' && (
                        <div className={transferStyles.tedFieldsGrid}>
                            <div className={transferStyles.bankCol}>
                                <Input
                                    label="Código do Banco"
                                    placeholder="Ex: 104 ou 001"
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                    maxLength={3}
                                    required
                                />
                                {detectedBankName && (
                                    <span className={transferStyles.bankBadge(
                                        isSearchingBank ? 'loading' : detectedBankName.includes('inválido') ? 'error' : 'success'
                                    )}>
                                        {detectedBankName}
                                    </span>
                                )}
                            </div>
                            <div className={transferStyles.agencyCol}>
                                <Input
                                    label="Agência"
                                    placeholder="0001"
                                    value={agency}
                                    onChange={(e) => setAgency(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={transferStyles.accountCol}>
                                <Input
                                    label="Conta Corrente"
                                    placeholder="00000-0"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    onBlur={handleAccountBlur}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <Input
                            label="Valor (R$)"
                            placeholder="0,00"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <span className={transferStyles.balanceBadge}>
                            Saldo disponível: {balanceLabel}
                        </span>
                    </div>

                    <Input
                        label="Data de Envio"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />

<div className={transferStyles.recurringBox}>
                        <label className={transferStyles.recurringCheckboxLabel}>
                            <input 
                                type="checkbox" 
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                                className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-slate-700 font-sans">
                                Repetir esta transferência (Agendamento Recorrente)
                            </span>
                        </label>

                        {isRecurring && (
                            <div className={transferStyles.recurringGrid}>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700 font-sans">Frequência</label>
                                    <select 
                                        value={recurrenceInterval} 
                                        onChange={(e) => setRecurrenceInterval(e.target.value)}
                                        className={transferStyles.selectField}
                                    >
                                        <option value="diaria">Diária</option>
                                        <option value="semanal">Semanal</option>
                                        <option value="mensal">Mensal</option>
                                        <option value="anual">Anual</option>
                                    </select>
                                </div>
                                
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700 font-sans">Nº de Parcelas / Repetições</label>
                                    <input 
                                        type="number" 
                                        min="2" 
                                        max="60"
                                        value={recurrenceCount}
                                        onChange={(e) => setRecurrenceCount(e.target.value)}
                                        className="w-full px-4 py-2 rounded bg-white border border-slate-300 focus:border-slate-500 text-sm font-sans text-slate-900 outline-none h-10"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={transferStyles.fullWidth}>
                        <Input
                            label="Descrição ou Identificador (Opcional)"
                            placeholder="Ex: Pagamento de fornecedor, Salário, etc..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className={`${transferStyles.fullWidth} ${transferStyles.footer}`}>
                        <Button type="submit" className={transferStyles.submitBtn}>
                            {transferType === 'pix' ? <Send /> : <ArrowRightLeft />}
                            Continuar Transferência
                        </Button>
                    </div>

                </form>
            </div>

        </div>
    );
}