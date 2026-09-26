import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/pages/home';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
  ]);

export const router = createRouter();
