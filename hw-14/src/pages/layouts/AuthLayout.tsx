import { Outlet, Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-center items-center p-4 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Ambient Glow Effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Header / Brand Logo */}
      <div className="mb-8 text-center z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-white/20 group-hover:scale-105 transition duration-300">
            <Clapperboard className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight font-outfit apple-gradient-text">
            Actor Spotlight
          </span>
        </Link>
      </div>

      {/* Centered Outlet */}
      <main className="w-full max-w-md z-10">
        <Outlet />
      </main>

      <footer className="mt-12 text-xs text-slate-500 text-center z-10 font-mono">
        TMDB Authentication • FSD Lite Architecture
      </footer>
    </div>
  );
}
