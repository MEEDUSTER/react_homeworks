import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../entities/user/model/AuthContext';
import { Role } from '../shared/types';
import { Spinner } from '../shared/ui/Spinner';

interface ProtectedRouteProps {
  requiredRole?: Role;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
        <Spinner size="lg" label="Перевірка авторизації..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/requests" replace />;
  }

  return <Outlet />;
};
