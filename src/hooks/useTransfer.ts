import { useState, useEffect } from 'react';
import { mockTransactions, addTransaction } from '../services/mockData';
import { useToast } from '../contexts/ToastContext';

export function useTransfer() {
    const { addToast } = useToast()

    const [transferType, setTransferType] = useState<'pix' | 'ted'>('pix');
    const [pixKey, setPixKey] = useState('');

    const [bank, setBank] = useState('');
    const [detectedBankName, setDetectedBankName] = useState('');
    const [isSearchingBank, setIsSearchingBank] = useState(false);

    const [agency, setAgency] = useState('');
    const [account, setAccount] = useState('');

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const totalIncomes = mockTransactions.filter(tx => tx.amount > 0).reduce((acc, tx) => acc + tx.amount, 0);
    const totalExpenses = mockTransactions.filter(tx => tx.amount < 0).reduce((acc, tx) => acc + tx.amount, 0);
    const currentBalance = totalIncomes + totalExpenses;

    useEffect(() => {
        const cleanBankCode = bank.replace(/\D/g, '');

        if (cleanBankCode.length === 3) {
            setIsSearchingBank(true);
            setDetectedBankName('Buscando...');

            fetch(`https://brasilapi.com.br/api/banks/v1/${cleanBankCode}`)
                .then(async (response) => {
                    if (!response.ok) throw new Error('Banco não encontrado');
                    return response.json();
                })
                .then((data) => {
                    setDetectedBankName(data.fullName || data.name);
                })
                .catch(() => {
                    setDetectedBankName('Banco inválido ou não encontrado');
                })
                .finally(() => {
                    setIsSearchingBank(false);
                });
        } else {
            setDetectedBankName('');
        }
    }, [bank]);

    const maskCpfCnpj = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length <= 11) {
            return cleanValue
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }
        return cleanValue
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

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

        if (isNaN(numericAmount) || numericAmount <= 0) {
            addToast('Por favor, informe um valor de transferência válido.', 'error');
            return;
        }

        if (numericAmount > currentBalance) {
            addToast('Tentativa de transferência negada: Saldo insuficiente.', 'error');
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
        const transactionDescription = description.trim()
            ? `${description} (${transferType === 'pix' ? 'Pix' : 'TED'})`
            : `Transferência ${transferType.toUpperCase()} - ${transferType === 'pix' ? pixKey : finalBankLabel}`;

        addTransaction({
            id: Math.random().toString(36).substring(2, 9),
            description: transactionDescription,
            amount: -numericAmount,
            date: date || new Date().toISOString().split('T')[0],
            category: 'Transferência',
            type: transferType === 'pix' ? 'Pix' : 'TED',
            status: 'Liquidado'
        });

        addToast(
            `Transferência de ${formattedAmount} realizada com sucesso! Destino: ${destinationDetails}`,
            'success'
        );

        setPixKey('');
        setBank('');
        setAgency('');
        setAccount('');
        setAmount('');
        setDescription('');
    };

    return {
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
        handleSubmit,
        balanceLabel: currentBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
}