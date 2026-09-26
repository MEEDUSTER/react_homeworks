import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../shared/api/axiosInstance';
import { useAuth } from '../entities/user/model/AuthContext';
import { RequestWithDetails, StatusHistoryEntry } from '../shared/types';
import { RequestStatusBadge, RequestPriorityBadge, RequestCategoryBadge } from '../entities/request/ui/RequestBadgeHelpers';
import { CommentItem } from '../entities/comment/ui/CommentItem';
import { HistoryTimeline } from '../entities/history/ui/HistoryTimeline';
import { StatusChangeForm } from '../features/change-request-status/ui/StatusChangeForm';
import { AddCommentForm } from '../features/add-comment/ui/AddCommentForm';
import { Card } from '../shared/ui/Card';
import { Spinner } from '../shared/ui/Spinner';
import { Button } from '../shared/ui/Button';
import { ArrowLeft, Calendar, User, Mail, Phone, MessageSquare, History, AlertTriangle, RefreshCw } from 'lucide-react';

export const RequestDetailsWidget: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { role } = useAuth();

  const {
    data: request,
    isLoading: isRequestLoading,
    isError: isRequestError,
    error: requestError,
    refetch: refetchRequest,
  } = useQuery<RequestWithDetails>({
    queryKey: ['request', id],
    queryFn: async () => {
      const res = await api.get<RequestWithDetails>(`/requests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    data: history,
    isLoading: isHistoryLoading,
  } = useQuery<StatusHistoryEntry[]>({
    queryKey: ['request-history', id],
    queryFn: async () => {
      const res = await api.get<StatusHistoryEntry[]>(`/requests/${id}/history`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isRequestLoading) {
    return (
      <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Spinner size="lg" label="Завантаження детальної інформації про заявку..." />
      </Card>
    );
  }

  if (isRequestError || !request) {
    return (
      <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
        <AlertTriangle size={48} color="#f87171" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f87171', marginBottom: '8px' }}>
          Не вдалося завантажити картку заявки
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
          {(requestError as any)?.response?.data?.message || 'Заявку не знайдено або у вас немає прав на її перегляд.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/requests">
            <Button variant="outline"><ArrowLeft size={16} /> Назад до списку</Button>
          </Link>
          <Button onClick={() => refetchRequest()}><RefreshCw size={16} /> Спробувати знову</Button>
        </div>
      </Card>
    );
  }

  const formattedDate = new Date(request.createdAt).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/requests" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
          <ArrowLeft size={18} /> Повернутися до списку заявок
        </Link>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>ID: {request.id}</span>
      </div>

      {/* Main Request Card */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Header Badges & Date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <RequestStatusBadge statusId={request.statusId} />
            <RequestPriorityBadge priorityId={request.priorityId} />
            <RequestCategoryBadge categoryId={request.categoryId} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
            <Calendar size={14} /> Створено: {formattedDate}
          </div>
        </div>

        {/* Request Title & Description */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px', lineHeight: 1.3 }}>
            {request.title}
          </h2>
          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #334155',
              color: '#cbd5e1',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {request.description}
          </div>
        </div>

        {/* Client Contact Details */}
        <div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <User size={16} color="#60a5fa" />
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Клієнт</span>
              <strong>{request.clientName}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <Mail size={16} color="#60a5fa" />
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Email</span>
              <span>{request.clientEmail}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <Phone size={16} color="#60a5fa" />
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Телефон</span>
              <span>{request.clientPhone}</span>
            </div>
          </div>
        </div>

        {/* Operator Controls (Status Changer) */}
        {role === 'operator' && (
          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <StatusChangeForm requestId={request.id} currentStatusId={request.statusId} />
          </div>
        )}
      </Card>

      {/* Two Column Layout for Comments & Status History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Comments Section */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} color="#3b82f6" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f8fafc' }}>
              Коментарі ({request.comments?.length || 0})
            </h3>
          </div>

          {role === 'operator' && (
            <AddCommentForm requestId={request.id} />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {request.comments && request.comments.length > 0 ? (
              request.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#64748b', fontStyle: 'italic' }}>
                Коментарів поки немає.
              </p>
            )}
          </div>
        </Card>

        {/* Status History Section */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#3b82f6" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f8fafc' }}>
              Історія змін статусів
            </h3>
          </div>

          {isHistoryLoading ? (
            <Spinner size="sm" label="Завантаження історії..." />
          ) : (
            <HistoryTimeline history={history || []} />
          )}
        </Card>
      </div>
    </div>
  );
};
