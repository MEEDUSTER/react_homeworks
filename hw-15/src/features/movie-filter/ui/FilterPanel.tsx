import React from 'react';

export interface FilterState {
  mood: 'joyful' | 'tense' | 'romantic' | 'epic' | 'any';
  runtime: 'short' | 'medium' | 'any';
  era: 'classic' | 'modern' | 'recent' | 'any';
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card/70 backdrop-blur-xl border border-border/60 p-6 rounded-3xl space-y-6 shadow-2xl">
      {/* Настрій / Жанровий напрямок */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          ✨ Ваші переваги (Настрій)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'any', label: '🎲 Будь-який' },
            { id: 'joyful', label: '😂 Веселий' },
            { id: 'tense', label: '😱 Напружений' },
            { id: 'romantic', label: '💖 Романтичний' },
            { id: 'epic', label: '🚀 Епічний' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateFilter('mood', item.id as FilterState['mood'])}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                filters.mood === item.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-neon-primary'
                  : 'bg-background/40 hover:bg-background border-border/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Хронометраж */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          ⏱️ Тривалість перегляду
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'any', label: 'Будь-яка' },
            { id: 'short', label: '⚡ Коротке (< 90 хв)' },
            { id: 'medium', label: '🍿 Стандарт (90-130 хв)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateFilter('runtime', item.id as FilterState['runtime'])}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                filters.runtime === item.id
                  ? 'bg-secondary text-secondary-foreground border-secondary shadow-neon-secondary'
                  : 'bg-background/40 hover:bg-background border-border/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Епоха кінематографа */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          📅 Епоха виходу
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'any', label: 'Усі роки' },
            { id: 'recent', label: '🔥 Новинки (2016+)' },
            { id: 'modern', label: '📼 2000-2015' },
            { id: 'classic', label: '📜 Класика (< 2000)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateFilter('era', item.id as FilterState['era'])}
              className={`py-2 px-2.5 rounded-2xl text-[11px] font-bold transition-all duration-200 border cursor-pointer ${
                filters.era === item.id
                  ? 'bg-accent text-accent-foreground border-accent shadow-neon-accent'
                  : 'bg-background/40 hover:bg-background border-border/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
