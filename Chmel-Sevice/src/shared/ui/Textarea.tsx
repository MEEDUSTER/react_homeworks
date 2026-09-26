import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, error, className = '', style, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label htmlFor={textareaId} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1' }}>
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          style={{
            width: '100%',
            padding: '10px 14px',
            backgroundColor: '#0f172a',
            border: error ? '1px solid #ef4444' : '1px solid #334155',
            borderRadius: 'var(--radius-md)',
            color: '#f8fafc',
            fontSize: '0.95rem',
            outline: 'none',
            minHeight: '100px',
            resize: 'vertical',
            fontFamily: 'inherit',
            ...style,
          }}
          className={className}
          {...props}
        />
        {error && (
          <span style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '2px' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
