import React, { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, className = '', style, ...props }, ref) => {
    const selectId = id || (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label htmlFor={selectId} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1' }}>
            {label}
          </label>
        )}
        <select
          id={selectId}
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
            cursor: 'pointer',
            ...style,
          }}
          className={className}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '2px' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
