import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Olá, mundo bancário!</h1>
        <p className="text-slate-600 mt-2">
          O ambiente está configurado. O próximo passo é criar os cards de saldo e a tabela de extrato do nosso PRD.
        </p>
      </div>
    </MainLayout>
  );
}

export default App;