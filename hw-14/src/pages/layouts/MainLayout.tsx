import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { isSessionActive, getUsername } from '@/entities/session';
import { LogoutButton } from '@/features/logout';
import { Clapperboard, ShieldAlert, Heart, Home as HomeIcon, User, LogIn } from 'lucide-react';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to sync favorites count from localStorage
  const updateFavoritesCount = () => {
    try {
      const stored = localStorage.getItem('actor_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavoritesCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        setFavoritesCount(0);
      }
    } catch {
      setFavoritesCount(0);
    }
  };

  // Helper to sync auth state
  const syncAuth = () => {
    setIsAuthenticated(isSessionActive());
    setUsername(getUsername());
  };

  useEffect(() => {
    updateFavoritesCount();
    syncAuth();

    window.addEventListener('storage', updateFavoritesCount);
    window.addEventListener('favorites-updated', updateFavoritesCount);
    window.addEventListener('auth-updated', syncAuth);

    return () => {
      window.removeEventListener('storage', updateFavoritesCount);
      window.removeEventListener('favorites-updated', updateFavoritesCount);
      window.removeEventListener('auth-updated', syncAuth);
    };
  }, [location]);

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white flex flex-col">
      {/* Ambient Mesh Glow Background Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090d16]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-white/20 group-hover:scale-105 transition duration-300">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight font-outfit apple-gradient-text">
                Actor Spotlight
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono ml-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                FSD LITE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-6 font-medium text-sm">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/30 font-bold shadow-sm" 
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <HomeIcon className="w-4 h-4" />
              <span>Головна</span>
            </NavLink>

            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? "text-rose-400 bg-rose-500/10 border border-rose-500/30 font-bold shadow-sm" 
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
              <span>Обране</span>
              {favoritesCount > 0 && (
                <span className="ml-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-md">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Auth Controls & Quick Action */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5 bg-white/5 p-1.5 pl-3 rounded-full border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span className="max-w-[100px] truncate">{username || 'User'}</span>
                </div>
                <LogoutButton />
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition duration-200 border border-white/10 shadow-md shadow-blue-600/20"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Увійти</span>
              </Link>
            )}

            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="statham"
                size="sm"
                onClick={() => navigate('/actor/976')}
                className="shadow-md hover:scale-105"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-slate-950" />
                <span>Стетхем (976)</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Routed Outlet View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Actor Spotlight. Feature-Sliced Design (FSD Lite) Edition.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => navigate('/actor/976')} 
              className="hover:text-amber-400 transition font-mono text-[11px] cursor-pointer"
            >
              🐺 Стетхем 50 quotes (id: 976)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
