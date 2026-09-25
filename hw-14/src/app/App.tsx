import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { actorApi, ActorCard, ActorList } from '@/entities/actor';
import { SearchForm } from '@/features/actor-search';
import { ActorDetailsModal } from '@/features/actor-details';
import { Pagination } from '@/shared/ui/pagination';
import { Button } from '@/shared/ui/button';
import { Sparkles, ShieldAlert, Clapperboard } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedActorId, setSelectedActorId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['actors', { query, page }],
    queryFn: () => (query ? actorApi.search(query, page) : actorApi.getPopular(page)),
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleReset = () => {
    setQuery('');
    setPage(1);
  };

  const handleOpenStatham = () => {
    setSelectedActorId(976);
  };

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white pb-16">
      {/* Apple Ambient Mesh Glow Background Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating Apple Glass Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090d16]/75 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-white/20">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight font-outfit apple-gradient-text">
                Actor Spotlight
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono ml-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                PRO 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="statham"
              size="sm"
              onClick={handleOpenStatham}
              className="shadow-md hover:scale-105"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-950" />
              <span>Джесон Стетхем ("id": 976)</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">
        {/* Apple Hero Header Banner */}
        <section className="text-center mb-10 max-w-3xl mx-auto space-y-4">
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
                  onClick={() => setSelectedActorId(actor.id)}
                />
              ))}
            </ActorList>

            {data && data.total_pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.min(data.total_pages, 500)}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>

      {/* Actor Details Modal Dialog */}
      <ActorDetailsModal
        actorId={selectedActorId}
        onClose={() => setSelectedActorId(null)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Actor Spotlight. Apple Style & 2 карти і 2 ствола Edition.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={handleOpenStatham} className="hover:text-amber-400 transition font-mono text-[11px]">
              🐺 Стетхем quotes (id: 976)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}