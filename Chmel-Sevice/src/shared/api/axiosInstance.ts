import axios from 'axios';
import { API_URL } from './mock/handlers';
import { users, requests, comments, statusHistory } from './mock/db';

/**
 * Головний Axios-інстанс для виконання мережевих запитів.
 */
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor:
 * Підставляє Bearer token з localStorage та заголовок симуляції помилок x-force-error
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const forcedError = localStorage.getItem('forcedErrorMode');
  if (forcedError && forcedError !== 'none') {
    config.headers.set('x-force-error', forcedError);
  }

  return config;
});

/**
 * Response Interceptor:
 * 1. При 401 Unauthorized — скидає сесію та перенаправляє на /login.
 * 2. Розумний фолбек (Mock Fallback) — якщо Service Worker не задіяно у браузері.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 Unauthorized handling
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      
      window.dispatchEvent(new Event('auth:unauthorized'));
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Резервна обробка у разі розриву з'єднання з mock-сервером на 3000 порту
    if (!error.response && error.config) {
      const url = error.config.url || '';
      const method = (error.config.method || 'get').toLowerCase();

      // Фолбек для POST /auth/login
      if (url.includes('/auth/login') && method === 'post') {
        const body = JSON.parse(error.config.data || '{}');
        const email = (body.email || '').toLowerCase();
        const role = email.includes('operator') ? 'operator' : 'user';
        const accessToken = role === 'operator' ? 'token-operator-2' : 'token-user-1';

        return Promise.resolve({
          data: { accessToken, role },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }

      // Фолбек для GET /auth/me
      if (url.includes('/auth/me') && method === 'get') {
        const authHeader = error.config.headers?.Authorization || '';
        const isOperator = String(authHeader).includes('operator');
        const user = isOperator ? users[1] : users[0];

        return Promise.resolve({
          data: user,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }

      // Фолбек для GET /requests/:id/history
      if (url.includes('/history') && method === 'get') {
        const parts = url.split('/requests/')[1]?.split('/');
        const reqId = parts ? parts[0] : '';
        const reqHistory = statusHistory.filter((h) => h.requestId === reqId);
        return Promise.resolve({
          data: reqHistory,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }

      // Фолбек для PATCH /requests/:id/status
      if (url.includes('/status') && method === 'patch') {
        const reqId = url.split('/requests/')[1]?.split('/')[0];
        const body = JSON.parse(error.config.data || '{}');
        const item = requests.find((r) => r.id === reqId) || requests[0];
        if (item && body.statusId) {
          item.statusId = body.statusId;
        }
        return Promise.resolve({
          data: item,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }

      // Фолбек для POST /requests/:id/comments
      if (url.includes('/comments') && method === 'post') {
        const reqId = url.split('/requests/')[1]?.split('/')[0];
        const body = JSON.parse(error.config.data || '{}');
        const newComment = {
          id: `com-${Math.random().toString(36).substring(2, 9)}`,
          requestId: reqId || 'req-1',
          authorName: 'Олена Оператор',
          text: body.text || '',
          createdAt: new Date().toISOString(),
        };
        comments.push(newComment);
        return Promise.resolve({
          data: newComment,
          status: 201,
          statusText: 'Created',
          headers: {},
          config: error.config,
        });
      }

      // Фолбек для GET /requests/:id (конкретна картка заявки)
      if (url.match(/\/requests\/[^\/]+$/) && method === 'get') {
        const reqId = url.split('/requests/')[1]?.split('?')[0];
        if (reqId && reqId !== 'my') {
          const item = requests.find((r) => r.id === reqId) || requests[0];
          const reqComments = comments.filter((c) => c.requestId === item.id);
          return Promise.resolve({
            data: { ...item, comments: reqComments },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config,
          });
        }
      }

      // Фолбек для списку заявок /requests або /requests/my
      if (url.includes('/requests') && method === 'get') {
        return Promise.resolve({
          data: requests,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }
    }

    return Promise.reject(error);
  }
);
