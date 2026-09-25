import { Form } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export function LogoutButton({ className = '', showText = true }: LogoutButtonProps) {
  return (
    <Form action="/logout" method="post" className="inline-block">
      <button
        type="submit"
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition duration-200 border border-rose-500/30 cursor-pointer ${className}`}
        title="Вийти з акаунта"
      >
        <LogOut className="w-3.5 h-3.5" />
        {showText && <span>Вийти</span>}
      </button>
    </Form>
  );
}
