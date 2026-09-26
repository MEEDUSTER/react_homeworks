import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../entities/user/model/AuthContext';
import { LoginForm } from '../features/auth/ui/LoginForm';
import { Card } from '../shared/ui/Card';
import { Wrench, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/requests" replace />;
  }

  const handleSuccess = (_userRole: string) => {
    navigate('/requests');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 70%)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        {/* Left Branding / Features Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--accent-glow)',
              }}
            >
              <Wrench size={26} color="#ffffff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                Chmel Service
              </h1>
              <span style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 500 }}>
                Система керування сервісними заявками
              </span>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Єдиний портал для подання, обробки та відстеження технічних і фінансових заявок у режимі реального часу.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#34d399" />
              <span>Швидке створення та відстеження статусу заявки</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <ShieldCheck size={18} color="#3b82f6" />
              <span>Розподіл ролей (Клієнт / Оператор)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <Clock size={18} color="#c084fc" />
              <span>Повна історія змін статусів та коментарі</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <Card style={{ padding: '36px 32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
            Вхід у систему
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '24px' }}>
            Введіть ваші облікові дані для доступу до сервісу
          </p>

          <LoginForm onSuccess={handleSuccess} />
        </Card>
      </div>
    </div>
  );
};
