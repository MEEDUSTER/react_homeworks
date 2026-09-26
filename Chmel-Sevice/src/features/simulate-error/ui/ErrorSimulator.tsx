import React, { useState, useEffect } from 'react';
import { AlertTriangle, WifiOff, ServerCrash, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../../shared/context/ToastContext';
import { useQueryClient } from '@tanstack/react-query';

export const ErrorSimulator: React.FC = () => {
  const [errorMode, setErrorMode] = useState<string>(() => localStorage.getItem('forcedErrorMode') || 'none');
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const handleToggle = (mode: string) => {
    setErrorMode(mode);
    localStorage.setItem('forcedErrorMode', mode);
    
    // Invalidate queries so user can see immediate UI error response
    queryClient.invalidateQueries();

    if (mode === '500') {
      showToast('Увімкнено симуляцію помилки 500 (Internal Server Error)', 'warning');
    } else if (mode === 'network') {
      showToast('Увімкнено симуляцію помилки мережі (Network Error)', 'warning');
    } else {
      showToast('Симуляцію помилок вимкнено (Нормальний режим)', 'info');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', backgroundColor: '#0f172a', borderRadius: 'var(--radius-md)', border: '1px solid #334155' }}>
      <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
        <AlertTriangle size={13} color="#fbbf24" /> Симуляція помилок:
      </span>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => handleToggle('none')}
          title="Нормальний режим"
          style={{
            padding: '3px 8px',
            fontSize: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: errorMode === 'none' ? '#10b981' : '#1e293b',
            color: errorMode === 'none' ? '#ffffff' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <CheckCircle2 size={11} /> Нормально
        </button>

        <button
          type="button"
          onClick={() => handleToggle('500')}
          title="Симулювати 500 помилку сервера"
          style={{
            padding: '3px 8px',
            fontSize: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: errorMode === '500' ? '#ef4444' : '#1e293b',
            color: errorMode === '500' ? '#ffffff' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <ServerCrash size={11} /> 500 Error
        </button>

        <button
          type="button"
          onClick={() => handleToggle('network')}
          title="Симулювати втрату мережі"
          style={{
            padding: '3px 8px',
            fontSize: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: errorMode === 'network' ? '#f59e0b' : '#1e293b',
            color: errorMode === 'network' ? '#ffffff' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <WifiOff size={11} /> Network Error
        </button>
      </div>
    </div>
  );
};
