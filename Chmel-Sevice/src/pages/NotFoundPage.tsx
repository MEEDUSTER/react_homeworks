import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { FileQuestion, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--bg-dark)',
      }}
    >
      <Card style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '48px 24px' }}>
        <FileQuestion size={64} color="#f87171" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#cbd5e1', marginTop: '8px', marginBottom: '12px' }}>
          Сторінку не знайдено
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '24px' }}>
          Запитуваний роут не існує або був переміщений.
        </p>
        <Link to="/requests">
          <Button size="md">
            <Home size={16} /> Повернутися на головну
          </Button>
        </Link>
      </Card>
    </div>
  );
};
