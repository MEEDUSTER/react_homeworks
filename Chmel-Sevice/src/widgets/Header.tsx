import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../entities/user/model/AuthContext';
import { Badge } from '../shared/ui/Badge';
import { Button } from '../shared/ui/Button';
import { ErrorSimulator } from '../features/simulate-error/ui/ErrorSimulator';
import { Wrench, LogOut, Plus, FileText, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '12px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo & Brand */}
        <Link to="/requests" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--accent-glow)',
            }}
          >
            <Wrench size={20} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
              Chmel Service
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Сервісна служба</span>
          </div>
        </Link>

        {/* Error Simulation Toggle */}
        <ErrorSimulator />

        {/* Right Section: User details & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {role === 'user' && (
            <Link to="/requests/new">
              <Button size="sm">
                <Plus size={16} /> Нова заявка
              </Button>
            </Link>
          )}

          <Link to="/requests" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <FileText size={16} /> Заявки
          </Link>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} color="#94a3b8" /> {user.name}
                </div>
                <div style={{ marginTop: '2px' }}>
                  {role === 'operator' ? (
                    <Badge variant="operator" size="sm">Оператор</Badge>
                  ) : (
                    <Badge variant="user" size="sm">Клієнт</Badge>
                  )}
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout} title="Вийти з системи">
                <LogOut size={18} color="#f87171" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
