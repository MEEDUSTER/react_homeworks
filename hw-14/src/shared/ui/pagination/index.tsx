import { Button } from '../button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 my-10">
      <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Назад</span>
        </Button>

        <span className="text-xs sm:text-sm text-slate-300 px-3 font-medium">
          Сторінка <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">{currentPage}</span> з {totalPages}
        </span>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Вперед</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}