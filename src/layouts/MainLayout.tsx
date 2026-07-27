import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50 w-full text-slate-800">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-emerald-400">FinancePJ</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="block px-4 py-2 bg-slate-800 text-white rounded-md font-medium">
            Resumo
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
            Extrato
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
            Pix / Transferências
          </a>
        </nav>
      </aside>

      {/* Área Principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 w-full">
          <h2 className="text-lg font-semibold text-slate-800">Visão Geral</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">TechCorp Soluções</p>
              <p className="text-xs text-slate-500">CNPJ: 00.000.000/0001-00</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald-400"></div>
          </div>
        </header>

        {/* Conteúdo da Tela */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {children}
        </main>
        
      </div>
    </div>
  );
}