import React from 'react';
import { Header } from '../widgets/Header';
import { CreateRequestForm } from '../features/create-request/ui/CreateRequestForm';
import { Card } from '../shared/ui/Card';
import { PlusCircle } from 'lucide-react';

export const NewRequestPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        <Card style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <PlusCircle size={28} color="#3b82f6" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
              Створення нової сервісної заявки
            </h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '28px' }}>
            Заповніть форму нижче. Наші спеціалісти розглянуть ваше звернення у найкоротші терміни.
          </p>

          <CreateRequestForm />
        </Card>
      </main>
    </div>
  );
};
