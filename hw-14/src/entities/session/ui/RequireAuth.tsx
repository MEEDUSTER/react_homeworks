import { type ReactNode } from 'react';
import { isSessionActive } from '../model/session';

interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequireAuth({ children, fallback = null }: RequireAuthProps) {
  const active = isSessionActive();
  if (!active) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
