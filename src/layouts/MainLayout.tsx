import { type ReactNode } from 'react';
import { LayoutDashboard, FileText, Send, Bell, Building2 } from 'lucide-react';

const styles = {
  wrapper: "flex h-screen bg-slate-50 w-full text-slate-800",
  mainArea: "flex-1 flex flex-col h-full overflow-hidden",
  content: "flex-1 overflow-y-auto p-8 bg-slate-50",

  sidebar: "w-64 bg-slate-900 text-slate-300 flex flex-col h-full",
  sidebarHeader: "h-16 flex items-center px-6 border-b border-slate-800",
  sidebarBrand: "text-xl font-bold text-emerald-400 font-display",
  navContainer: "flex-1 px-4 py-6 space-y-2",
  navItemActive: "block px-4 py-2 bg-slate-800 text-white rounded-md font-medium font-sans",
  navItem: "block px-4 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors font-sans",

  header: "h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 w-full",
  headerTitle: "text-lg font-semibold text-slate-800 font-display",

  profileSection: "flex items-center gap-6",
  notificationBtn: "relative text-slate-400 hover:text-slate-600 transition-colors",
  notificationBadge: "absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white",
  divider: "w-px h-6 bg-slate-200",
  profileTextGroup: "text-right hidden sm:block font-sans",
  profileName: "text-sm font-semibold text-slate-700",
  profileCnpj: "text-xs text-slate-500",
  avatar: "flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-500"
};

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.wrapper}>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarBrand}>FinancePJ</h1>
        </div>

        <nav className={styles.navContainer}>
          <a href="#" className={styles.navItemActive}>
            <LayoutDashboard size={18} />
            Resumo
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={18} />
            Extrato
          </a>
          <a href="#" className={styles.navItem}>
            <Send size={18} />
            Pix / Transferências
          </a>
        </nav>
      </aside>

      <div className={styles.mainArea}>
        
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Visão Geral</h2>
          
          <div className={styles.profileSection}>
            
            <button className={styles.notificationBtn}>
              <Bell size={20} />
              <span className={styles.notificationBadge}></span>
            </button>

            <div className={styles.divider}></div>

            <div className={styles.profileTextGroup}>
              <p className={styles.profileName}>TechCorp Soluções</p>
              <p className={styles.profileCnpj}>CNPJ: 00.000.000/0001-00</p>
            </div>

            <div className={styles.avatar}>
              <Building2 size={20} />
            </div>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>

      </div>
    </div>
  );
}