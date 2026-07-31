import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Statement } from './pages/Statement';

export function App() {

  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <MainLayout activePage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'statement' && <Statement />}
      {currentPage === 'transfer' && (
        <div className="flex items-center justify-center h-full text-slate-500">
          <p>Tela de Pix / Transferências em construção...</p>
        </div>
      )}

    </MainLayout>
  );
}

export default App;