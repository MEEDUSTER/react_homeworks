import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { statuses } from '../../../shared/api/mock/db';
import { Filter } from 'lucide-react';

export const StatusFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleSelectStatus = (statusId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (statusId === 'all') {
      newParams.delete('status');
    } else {
      newParams.set('status', statusId);
    }
    setSearchParams(newParams);
  };

  const filterOptions = [
    { id: 'all', name: 'Усі статуси' },
    ...statuses,
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
        <Filter size={14} /> Фільтр:
      </span>
      {filterOptions.map((opt) => {
        const isActive = currentStatus === opt.id || (currentStatus === 'all' && opt.id === 'all');
        return (
          <button
            key={opt.id}
            onClick={() => handleSelectStatus(opt.id)}
            style={{
              padding: '6px 14px',
              fontSize: '0.825rem',
              fontWeight: isActive ? 600 : 400,
              borderRadius: 'var(--radius-full)',
              border: isActive ? '1px solid #3b82f6' : '1px solid #334155',
              backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : '#0f172a',
              color: isActive ? '#60a5fa' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt.name}
          </button>
        );
      })}
    </div>
  );
};
