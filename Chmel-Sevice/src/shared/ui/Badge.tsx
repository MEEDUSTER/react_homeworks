import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'in_progress' | 'resolved' | 'cancelled' | 'high' | 'medium' | 'low' | 'user' | 'operator' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', size = 'md' }) => {
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'new':
        return { background: 'var(--status-new-bg)', border: '1px solid var(--status-new-border)', color: 'var(--status-new-text)' };
      case 'in_progress':
        return { background: 'var(--status-progress-bg)', border: '1px solid var(--status-progress-border)', color: 'var(--status-progress-text)' };
      case 'resolved':
        return { background: 'var(--status-resolved-bg)', border: '1px solid var(--status-resolved-border)', color: 'var(--status-resolved-text)' };
      case 'cancelled':
        return { background: 'var(--status-cancelled-bg)', border: '1px solid var(--status-cancelled-border)', color: 'var(--status-cancelled-text)' };
      case 'high':
        return { background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171' };
      case 'medium':
        return { background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', color: '#fbbf24' };
      case 'low':
        return { background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399' };
      case 'operator':
        return { background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', color: '#c084fc' };
      case 'user':
        return { background: 'rgba(59, 130, 246, 0.15)', border: '1px solid #3b82f6', color: '#60a5fa' };
      default:
        return { background: 'rgba(148, 163, 184, 0.15)', border: '1px solid #64748b', color: '#cbd5e1' };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        fontSize: size === 'sm' ? '0.75rem' : '0.825rem',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        lineHeight: 1.2,
        ...getStyles(),
      }}
    >
      {children}
    </span>
  );
};
