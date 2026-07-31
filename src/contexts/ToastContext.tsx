import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, type LucideIcon } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextData {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const styles = {
  container: "fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 max-w-sm w-full pointer-events-none",
  
  toastCard: (type: ToastType) => {
    const base = "w-full p-4 rounded-lg shadow-lg border flex items-start gap-3 pointer-events-auto transition-all duration-300 ease-in-out font-sans text-sm animate-slide-in [&>div>svg]:w-4.5 [&>div>svg]:h-4.5";
    if (type === 'success') return `${base} bg-emerald-50 border-emerald-200 text-emerald-800 [&>div>svg]:text-emerald-500`;
    if (type === 'error') return `${base} bg-red-50 border-red-200 text-red-800 [&>div>svg]:text-red-500`;
    return `${base} bg-slate-50 border-slate-200 text-slate-800 [&>div>svg]:text-slate-500`;
  },
  
  iconWrapper: "flex-shrink-0 mt-0.5",
  messageText: "flex-1 leading-5 font-medium",
  closeBtn: "flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors ml-1 [&>svg]:w-4 [&>svg]:h-4"
};

function getToastIcon(type: ToastType): LucideIcon {
  if (type === 'success') return CheckCircle2;
  if (type === 'error') return AlertTriangle;
  return Info;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      <div className={styles.container}>
        {toasts.map((toast) => {
          const IconComponent = getToastIcon(toast.type);
          
          return (
            <div key={toast.id} className={styles.toastCard(toast.type)}>
              <div className={styles.iconWrapper}>
                <IconComponent />
              </div>
              
              <span className={styles.messageText}>{toast.message}</span>
              
              <button onClick={() => removeToast(toast.id)} className={styles.closeBtn}>
                <X />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de um ToastProvider');
  }
  return context;
}