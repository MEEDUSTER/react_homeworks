import React from 'react';
import { Comment } from '../../../shared/types';
import { Badge } from '../../../shared/ui/Badge';
import { UserCheck, Clock } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formattedDate = new Date(comment.createdAt).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={16} color="#c084fc" />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>
            {comment.authorName}
          </span>
          <Badge variant="operator" size="sm">Оператор</Badge>
        </div>
        <span style={{ fontSize: '0.775rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {formattedDate}
        </span>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
        {comment.text}
      </p>
    </div>
  );
};
