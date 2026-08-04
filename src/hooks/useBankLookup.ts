import { useState, useEffect } from 'react';

export function useBankLookup() {
    const [bank, setBank] = useState('');
    const [detectedBankName, setDetectedBankName] = useState('');
    const [isSearchingBank, setIsSearchingBank] = useState(false);

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

    return {
        bank,
        setBank,
        detectedBankName,
        isSearchingBank
    };
}