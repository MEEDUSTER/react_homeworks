import { type Actor } from '../model/types';
import { Star, ShieldAlert } from 'lucide-react';

interface ActorCardProps {
  actor: Actor;
  onClick: () => void;
}

export function ActorCard({ actor, onClick }: ActorCardProps) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';
  const fallbackImage = 'https://placehold.co/185x250/1e293b/94a3b8?text=No+Photo';

  const isStatham = actor.id === 976 || actor.name.toLowerCase().includes('jason statham');

  return (
    <div 
      onClick={onClick}
      className={`group relative rounded-2xl p-3 sm:p-4 transition-all duration-300 cursor-pointer flex flex-col items-center text-center backdrop-blur-xl ${
        isStatham 
          ? 'bg-gradient-to-b from-amber-950/40 via-slate-900/80 to-slate-900/90 border border-amber-500/40 shadow-xl shadow-amber-500/10 hover:border-amber-400 hover:shadow-amber-500/30 hover:-translate-y-1.5' 
          : 'bg-slate-900/40 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900/70 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1'
      }`}
    >
      {/* Special Badge for Jason Statham */}
      {isStatham && (
        <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 font-cinzel">
          <ShieldAlert className="w-3 h-3" />
          <span>2 СТВОЛА</span>
        </div>
      )}

      {/* Profile Image Container */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-[3/4] mb-3 bg-slate-800/80 shadow-inner">
        <img
          src={actor.profile_path ? `${imageBaseUrl}${actor.profile_path}` : fallbackImage}
          alt={actor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Actor Name & Details */}
      <h2 className={`text-base font-bold line-clamp-1 group-hover:text-blue-400 transition-colors ${
        isStatham ? 'gold-gradient-text font-extrabold' : 'text-slate-100'
      }`}>
        {actor.name}
      </h2>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="font-semibold text-slate-300">{actor.popularity.toFixed(1)}</span>
        <span className="text-slate-500 text-[11px]">рейт</span>
      </div>

      {isStatham && (
        <span className="mt-2 text-[11px] text-amber-300/90 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          🐺 Подивитись цитатник
        </span>
      )}
    </div>
  );
}