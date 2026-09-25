import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import ActorDetails from './pages/ActorDetails';
import Favorites from './pages/Favorites';
import LoginForm, { loginAction } from './pages/LoginForm';
import ErrorPage from './pages/ErrorPage';
import { requireAuthLoader, logoutAction } from './utils/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        loader: requireAuthLoader,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
        action: loginAction,
      },
    ],
  },
  {
    path: 'logout',
    action: logoutAction,
  },
  {
    path: '*',
    element: <ErrorPage />,
    loader: () => {
      throw new Response('Сторінку не знайдено', { status: 404 });
    },
  },
]);
