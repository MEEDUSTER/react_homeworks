import { useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, RotateCcw, Flame } from 'lucide-react';

interface SearchFormInputs {
  query: string;
}

interface SearchFormProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  currentQuery: string;
}

export function SearchForm({ onSearch, onReset, currentQuery }: SearchFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<SearchFormInputs>({
    defaultValues: { query: currentQuery },
  });

  const onSubmit = (data: SearchFormInputs) => {
    onSearch(data.query.trim());
  };

  const handleResetClick = () => {
    reset({ query: '' });
    onReset();
  };

  const handleQuickStatham = () => {
    setValue('query', 'Jason Statham');
    onSearch('Jason Statham');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <Input
            {...register('query', { required: true })}
            type="text"
            placeholder="Пошук акторів (напр. Jason Statham, Keanu Reeves)..."
            className="pl-12 pr-4"
          />
        </div>
        
        <Button type="submit" variant="primary" size="md">
          <span>Пошук</span>
        </Button>

        {currentQuery && (
          <Button type="button" variant="secondary" size="md" onClick={handleResetClick} title="Скинути">
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </form>

      {/* Quick suggestions / Hot badge */}
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400 flex-wrap">
        <span className="text-slate-500 font-medium">Швидкий вибір:</span>
        <button
          type="button"
          onClick={handleQuickStatham}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer font-cinzel font-bold text-[11px]"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>🔥 Джейсон Стетхем (2 карти і 2 ствола)</span>
        </button>
      </div>
    </div>
  );
}