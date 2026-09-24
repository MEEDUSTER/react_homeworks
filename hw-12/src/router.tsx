import { createBrowserRouter, useRouteError, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ActorDetails from './pages/ActorDetails';
import Favorites from './pages/Favorites';
import { Button } from '@/shared/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

function RouteErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Виникла помилка під час завантаження сторінки</h2>
      <p className="text-sm text-slate-400 max-w-md mb-6">
        {error instanceof Error ? error.message : 'Перевірте правильність параметрів URL або спробуйте оновити сторінку.'}
      </p>
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4" />
          <span>Перезавантажити сторінку</span>
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <span>На головну</span>
        </Button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'actor/:actorId',
        element: <ActorDetails />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
    ],
  },
]);

