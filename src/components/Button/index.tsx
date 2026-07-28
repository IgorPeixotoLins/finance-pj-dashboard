import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  // Base do botão: 4px radius (rounded), texto sans-serif médio
  const baseStyles = "px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center font-sans";
  
  // Variantes mapeadas diretamente do DESIGN.md
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-transparent border border-slate-500 text-slate-700 hover:bg-slate-50",
    success: "bg-emerald-500 text-white hover:bg-emerald-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}