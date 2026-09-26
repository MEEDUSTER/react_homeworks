import React from 'react';
import { StatusHistoryEntry } from '../../../shared/types';
import { RequestStatusBadge } from '../../request/ui/RequestBadgeHelpers';
import { History, ArrowRight } from 'lucide-react';

interface HistoryTimelineProps {
  history: StatusHistoryEntry[];
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Історія статусів порожня.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {history.map((entry) => {
        const formattedDate = new Date(entry.updatedAt).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: '#0f172a',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #334155',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={16} color="#60a5fa" />
              {entry.oldStatusId ? (
                <>
                  <RequestStatusBadge statusId={entry.oldStatusId} />
                  <ArrowRight size={14} color="#64748b" />
                  <RequestStatusBadge statusId={entry.newStatusId} />
                </>
              ) : (
                <>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Створено зі статусом</span>
                  <RequestStatusBadge statusId={entry.newStatusId} />
                </>
              )}
            </div>

            <div style={{ fontSize: '0.775rem', color: '#64748b', textAlign: 'right' }}>
              <div>{entry.updatedBy}</div>
              <div>{formattedDate}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
