import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'statham' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 border border-white/20',
    secondary: 'bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10 backdrop-blur-md hover:border-white/20 shadow-sm',
    statham: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 border border-amber-400/40 font-cinzel tracking-wider',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5',
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}