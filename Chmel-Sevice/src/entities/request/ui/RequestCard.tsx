import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceRequest } from '../../../shared/types';
import { Card } from '../../../shared/ui/Card';
import { RequestStatusBadge, RequestPriorityBadge, RequestCategoryBadge } from './RequestBadgeHelpers';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface RequestCardProps {
  request: ServiceRequest;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const formattedDate = new Date(request.createdAt).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card hoverable style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <RequestStatusBadge statusId={request.statusId} />
          <RequestPriorityBadge priorityId={request.priorityId} />
          <RequestCategoryBadge categoryId={request.categoryId} />
        </div>
        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={14} /> {formattedDate}
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f8fafc', marginBottom: '6px', lineHeight: 1.3 }}>
          {request.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {request.description}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          <User size={14} color="#94a3b8" />
          <span>{request.clientName}</span>
        </div>

        <Link
          to={`/requests/${request.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#3b82f6',
          }}
        >
          Переглянути <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
};
