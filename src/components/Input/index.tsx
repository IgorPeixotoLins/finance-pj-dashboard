import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-700 font-sans">
            {label}
          </label>
        )}
        <input 
          ref={ref}
          className={`px-4 py-2 rounded bg-slate-100 border border-transparent focus:bg-white focus:border-slate-500 outline-none transition-all font-sans text-slate-900 placeholder:text-slate-400 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';