import { type ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface ActorListProps {
  children: ReactNode;
  isEmpty: boolean;
}

export function ActorList({ children, isEmpty }: ActorListProps) {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl my-8">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shadow-lg shadow-blue-500/10">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-1">Акторів не знайдено</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          Спробуйте змінити пошуковий запит або скинути фільтри для перегляду популярних акторів.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {children}
    </div>
  );
}