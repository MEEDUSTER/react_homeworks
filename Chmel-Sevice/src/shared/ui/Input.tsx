import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, helperText, className = '', style, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label htmlFor={inputId} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1' }}>
            {label}
          </label>
        )}
        <input
          id={inputId}
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
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
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
        {!error && helperText && (
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
