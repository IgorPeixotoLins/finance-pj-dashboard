import { useState } from 'react';
import { addTransaction } from '../services/mockData';
import { useToast } from '../contexts/ToastContext';
import { calculateCurrentBalance } from './useTransactions';
import { useBankLookup } from './useBankLookup';
import { getLocalDateStr, incrementDate } from '../utils/dateUtils';
import { maskCpfCnpj } from '../utils/masks';

export function useTransfer() {
    const { addToast } = useToast();
    const { bank, setBank, detectedBankName, isSearchingBank } = useBankLookup();

    const [transferType, setTransferType] = useState<'pix' | 'ted'>('pix');
    const [pixKey, setPixKey] = useState('');
    const [agency, setAgency] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(getLocalDateStr());

    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceInterval, setRecurrenceInterval] = useState('mensal');
    const [recurrenceCount, setRecurrenceCount] = useState('2');

    const currentBalance = calculateCurrentBalance();

    const handleKeyChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        if (/^\d*$/.test(cleanValue) && cleanValue.length <= 14 && !value.includes('@')) {
            setPixKey(maskCpfCnpj(value));
        } else {
            setPixKey(value);
        }
    };

    const handleAccountBlur = () => {
        const cleanAccount = account.replace(/\D/g, '');
        if (cleanAccount.length > 1) {
            const mainPart = cleanAccount.slice(0, -1);
            const digit = cleanAccount.slice(-1);
            setAccount(`${mainPart}-${digit}`);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount.replace(',', '.'));
        const numCount = parseInt(recurrenceCount, 10);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            addToast('Por favor, informe um valor de transferência válido.', 'error');
            return;
        }

        if (isRecurring && (isNaN(numCount) || numCount < 2 || numCount > 60)) {
            addToast('A recorrência deve ser entre 2 e 60 parcelas.', 'error');
            return;
        }

        const firstTransactionDate = date || getLocalDateStr();
        const todayStr = getLocalDateStr();
        if (firstTransactionDate <= todayStr && numericAmount > currentBalance) {
            addToast('Tentativa de transferência negada: Saldo imediato insuficiente.', 'error');
            return;
        }

        if (transferType === 'ted' && (!bank || !agency || !account)) {
            addToast('Preencha todos os dados bancários obrigatórios para o TED.', 'error');
            return;
        }

        if (transferType === 'ted' && detectedBankName === 'Banco inválido ou não encontrado') {
            addToast('Por favor, insira um código de banco válido.', 'error');
            return;
        }

        const cleanBankCode = bank.replace(/\D/g, '');
        const finalBankLabel = detectedBankName ? `${cleanBankCode} - ${detectedBankName}` : bank;
        const formattedAmount = numericAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        let destinationDetails = '';
        if (transferType === 'pix') {
            destinationDetails = `Pix para chave: ${pixKey}`;
        } else {
            destinationDetails = `TED | Banco: ${finalBankLabel} | Ag: ${agency} | Conta: ${account} | CPF/CNPJ: ${pixKey}`;
        }

        const baseDescription = description.trim()
            ? `${description} (${transferType === 'pix' ? 'Pix' : 'TED'})`
            : `Transferência ${transferType.toUpperCase()} - ${transferType === 'pix' ? pixKey : finalBankLabel}`;
        
        const totalTransactions = isRecurring ? numCount : 1;
        const loopTodayStr = getLocalDateStr();

        for (let i = 0; i < totalTransactions; i++) {
            const txDate = isRecurring ? incrementDate(firstTransactionDate, recurrenceInterval, i) : firstTransactionDate;
            const isFutureTransaction = txDate > loopTodayStr;
            const transactionStatus = isFutureTransaction ? 'Agendado' : 'Liquidado';
            const iterDescription = isRecurring ? `${baseDescription} (${i + 1}/${totalTransactions})` : baseDescription;

            addTransaction({
                id: Math.random().toString(36).substring(2, 9),
                description: iterDescription,
                amount: -numericAmount,
                date: txDate,
                category: 'Transferência',
                type: transferType === 'pix' ? 'Pix' : 'TED',
                status: transactionStatus
            });
        }

        if (isRecurring) {
            addToast(`Foram agendadas ${numCount} transferências recorrentes de ${formattedAmount}! Destino: ${destinationDetails}`, 'success');
        } else if (firstTransactionDate > loopTodayStr) {
            const [year, month, day] = firstTransactionDate.split('-');
            addToast(`Transferência de ${formattedAmount} agendada com sucesso para o dia ${day}/${month}/${year}! Destino: ${destinationDetails}`, 'success');
        } else {
            addToast(`Transferência de ${formattedAmount} realizada com sucesso! Destino: ${destinationDetails}`, 'success');
        }

        setPixKey('');
        setBank('');
        setAgency('');
        setAccount('');
        setAmount('');
        setDescription('');
        setIsRecurring(false);
        setRecurrenceCount('2');
    };

    return {
        transferType, setTransferType,
        pixKey, handleKeyChange,
        bank, setBank, detectedBankName, isSearchingBank,
        agency, setAgency, account, setAccount, handleAccountBlur,
        amount, setAmount,
        description, setDescription,
        date, setDate,
        isRecurring, setIsRecurring,
        recurrenceInterval, setRecurrenceInterval,
        recurrenceCount, setRecurrenceCount,
        handleSubmit,
        balanceLabel: currentBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
}