import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-5 py-3 bg-slate-900/60 text-slate-100 placeholder-slate-400 border border-white/10 rounded-full outline-none focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/20 backdrop-blur-xl transition-all duration-300 text-sm shadow-inner ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';