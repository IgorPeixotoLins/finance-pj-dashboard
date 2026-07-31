import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Statement } from './pages/Statement';
import { Transfer } from './pages/Transfer';
import { ToastProvider } from './contexts/ToastContext';

export function App() {

  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <ToastProvider>
      <MainLayout activePage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'statement' && <Statement />}
        {currentPage === 'transfer' && <Transfer />}
      </MainLayout>
    </ToastProvider>
  );
}

export default App;