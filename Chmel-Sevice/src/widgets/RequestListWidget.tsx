import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../shared/api/axiosInstance';
import { useAuth } from '../entities/user/model/AuthContext';
import { ServiceRequest } from '../shared/types';
import { RequestCard } from '../entities/request/ui/RequestCard';
import { StatusFilter } from '../features/filter-requests/ui/StatusFilter';
import { Skeleton } from '../shared/ui/Skeleton';
import { Button } from '../shared/ui/Button';
import { Inbox, AlertTriangle, RefreshCw, Plus } from 'lucide-react';

export const RequestListWidget: React.FC = () => {
  const { role } = useAuth();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  const queryKey = role === 'user' ? ['my-requests'] : ['all-requests', statusFilter];
  const queryEndpoint = role === 'user'
    ? '/requests/my'
    : `/requests${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`;

  const { data: requests, isLoading, isError, error, refetch } = useQuery<ServiceRequest[]>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<ServiceRequest[]>(queryEndpoint);
      return response.data;
    },
    retry: 1,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header section with Filter Bar & Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: 'var(--bg-card)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            {role === 'user' ? 'Мої сервісні заявки' : 'Всі сервісні заявки компанії'}
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            {role === 'user' ? 'Відстежуйте стан обробки своїх звернень' : 'Центр керування заявками клієнтів'}
          </span>
        </div>

        {role === 'operator' && <StatusFilter />}

        {role === 'user' && (
          <Link to="/requests/new">
            <Button size="sm">
              <Plus size={16} /> Створити заявку
            </Button>
          </Link>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="120px" height="24px" />
                <Skeleton width="80px" height="18px" />
              </div>
              <Skeleton width="80%" height="22px" />
              <Skeleton width="100%" height="40px" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <Skeleton width="100px" height="18px" />
                <Skeleton width="90px" height="18px" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <AlertTriangle size={48} color="#f87171" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f87171', marginBottom: '6px' }}>
              Помилка завантаження даних
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '500px' }}>
              {(error as any)?.response?.data?.message || (error as any)?.message || 'Не вдалося отримати список заявок з сервера.'}
            </p>
          </div>
          <Button variant="danger" size="md" onClick={() => refetch()}>
            <RefreshCw size={16} /> Повторити спробу
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && requests && requests.length === 0 && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Inbox size={56} color="#64748b" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>
              Заявок не знайдено
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              {statusFilter !== 'all'
                ? 'За вибраним статусом немає жодної заявки.'
                : role === 'user'
                ? 'У вас ще немає створених сервісних заявок.'
                : 'У системі поки немає заявок.'}
            </p>
          </div>
          {role === 'user' && (
            <Link to="/requests/new">
              <Button size="md">
                <Plus size={16} /> Подати першу заявку
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Success Request Cards Grid */}
      {!isLoading && !isError && requests && requests.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {requests.map((req) => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      )}
    </div>
  );
};
