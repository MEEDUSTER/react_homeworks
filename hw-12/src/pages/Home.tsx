import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { actorApi, ActorCard, ActorList } from '@/entities/actor';
import { SearchForm } from '@/features/actor-search';
import { Pagination } from '@/shared/ui/pagination';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams && typeof searchParams.get === 'function' ? (searchParams.get('query') || '') : '';
  const page = searchParams && typeof searchParams.get === 'function' ? (Number(searchParams.get('page')) || 1) : 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['actors', { query, page }],
    queryFn: () => (query ? actorApi.search(query, page) : actorApi.getPopular(page)),
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery) {
      setSearchParams({ query: newQuery, page: '1' });
    } else {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    if (query) {
      setSearchParams({ query, page: String(newPage) });
    } else {
      setSearchParams({ page: String(newPage) });
    }
  };

  return (
    <div className="space-y-8">
      {/* Apple Hero Header Banner */}
      <section className="text-center mb-8 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Designed by Apple in California • Lock, Stock Edition</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
          Досліджуйте світ <br className="hidden sm:inline" />
          <span className="apple-gradient-text">великого кінематографа</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
          Отримуйте вичерпну інформацію про улюблених акторів, фільмографію та культові цитати 2010-х років.
        </p>
      </section>

      {/* Search Bar Form */}
      <SearchForm currentQuery={query} onSearch={handleSearch} onReset={handleReset} />

      {/* Loading / Error / Data States */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-72 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500/20 border-t-blue-500"></div>
          <p className="text-sm text-slate-400 font-medium">Завантажуємо каталог акторів...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-300 max-w-md mx-auto my-8">
          <p className="text-lg font-bold mb-1">Сталася помилка при завантаженні</p>
          <p className="text-xs text-red-400">Перевірте мережеве з'єднання або спробуйте пізніше.</p>
        </div>
      ) : (
        <>
          <ActorList isEmpty={!data || data.results.length === 0}>
            {data?.results.map((actor) => (
              <ActorCard
                key={actor.id}
                actor={actor}
                onClick={() => navigate(`/actor/${actor.id}`)}
              />
            ))}
          </ActorList>

          {data && data.total_pages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.min(data.total_pages, 500)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
