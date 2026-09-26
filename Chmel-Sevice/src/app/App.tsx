import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../entities/user/model/AuthContext';
import { ToastProvider } from '../shared/context/ToastContext';
import { ToastContainer } from '../shared/ui/ToastContainer';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { RequestsPage } from '../pages/RequestsPage';
import { NewRequestPage } from '../pages/NewRequestPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Spinner } from '../shared/ui/Spinner';

// Lazy loading for request details page as required by task specification
const RequestDetailsPage = lazy(() => import('../pages/RequestDetailsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
                  <Spinner size="lg" label="Завантаження компонента..." />
                </div>
              }
            >
              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/requests" element={<RequestsPage />} />
                  <Route path="/requests/:id" element={<RequestDetailsPage />} />
                </Route>

                {/* Client-Only Protected Route */}
                <Route element={<ProtectedRoute requiredRole="user" />}>
                  <Route path="/requests/new" element={<NewRequestPage />} />
                </Route>

                {/* System Routes */}
                <Route path="/" element={<Navigate to="/requests" replace />} />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
            </Suspense>

            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
