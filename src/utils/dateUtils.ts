export const getLocalDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const incrementDate = (baseDateStr: string, interval: string, step: number) => {
    const [y, m, d] = baseDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);

    if (interval === 'diaria') dateObj.setDate(dateObj.getDate() + step);
    if (interval === 'semanal') dateObj.setDate(dateObj.getDate() + (step * 7));
    if (interval === 'mensal') dateObj.setMonth(dateObj.getMonth() + step);
    if (interval === 'anual') dateObj.setFullYear(dateObj.getFullYear() + step);

    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
};