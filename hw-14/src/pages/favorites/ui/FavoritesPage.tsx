import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActorCard, type Actor } from '@/entities/actor';
import { Button } from '@/shared/ui';
import { Heart, Trash2, Sparkles } from 'lucide-react';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Actor[]>([]);
  const navigate = useNavigate();

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem('actor_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter((actor) => actor.id !== id);
    setFavorites(updated);
    localStorage.setItem('actor_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('actor_favorites');
    window.dispatchEvent(new Event('favorites-updated'));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Ваша колекція ({favorites.length})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Обрані актори
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Актори, збережені у вашому локальному сховищі браузера
          </p>
        </div>

        {favorites.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFavorites}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Очистити все</span>
          </Button>
        )}
      </div>

      {/* Favorites List or Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl apple-glass my-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">У вас немає обраних акторів</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Переглядайте каталог акторів та натискайте "Додати в обране", щоб зберегти їх у своїй колекції.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            <Sparkles className="w-4 h-4" />
            <span>Перейти до каталогу</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {favorites.map((actor) => (
            <div key={actor.id} className="relative group">
              <ActorCard 
                actor={actor} 
                onClick={() => navigate(`/actor/${actor.id}`)} 
              />
              {/* Delete Icon Overlay */}
              <button
                onClick={(e) => removeFavorite(actor.id, e)}
                title="Видалити з обраного"
                className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 shadow-lg opacity-80 group-hover:opacity-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
