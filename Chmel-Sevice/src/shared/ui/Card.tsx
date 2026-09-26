import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverable = false, style, className = '', ...props }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        transition: 'transform var(--transition-normal), border-color var(--transition-normal), background-color var(--transition-normal)',
        cursor: hoverable ? 'pointer' : 'default',
        ...style,
      }}
      className={`card-wrapper ${hoverable ? 'hoverable-card' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
