import { http, HttpResponse, delay } from 'msw';
import {
  users,
  requests,
  comments,
  statusHistory,
  categories,
  priorities,
  statuses,
} from './db';
import { User, ServiceRequest } from '../../types';

// Базова адреса API
export const API_URL = 'http://localhost:3000';

/**
 * Хелпер для визначення авторизованого користувача за заголовком Authorization.
 */
const getAuthenticatedUser = (request: Request): User | null => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');

  if (token.includes('operator')) return users[1];
  return users[0];
};

/**
 * Хелпер для симуляції штучних серверних збоїв (500 помилка або обрив мережі).
 */
const checkForForcedErrors = (request: Request) => {
  const forceError = request.headers.get('x-force-error');
  if (forceError === '500') {
    return HttpResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
  }
  if (forceError === 'network') {
    return HttpResponse.error(); // Симуляція втрати інтернет-з'єднання
  }
  return null;
};

/**
 * Набір MSW-обробників для перехоплення HTTP-запитів.
 */
export const handlers = [
  // 1. POST /auth/login — Авторизація користувача
  http.post('*/auth/login', async ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const { email } = (await request.json()) as any;
    const cleanEmail = (email || '').toLowerCase().trim();

    // Роль визначиться автоматично залежно від введеного email
    if (cleanEmail.includes('operator')) {
      return HttpResponse.json({
        accessToken: 'token-operator-2',
        role: 'operator',
      });
    }

    return HttpResponse.json({
      accessToken: 'token-user-1',
      role: 'user',
    });
  }),

  // 2. GET /auth/me — Поточний користувач
  http.get('*/auth/me', ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    return HttpResponse.json(user);
  }),

  // 3. GET /requests/my — Заявки поточного клієнта
  http.get('*/requests/my', async ({ request }) => {
    await delay(300); // Невелика затримка для демонстрації скелетона

    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const myRequests = requests.filter(r => r.clientEmail === user.email);
    return HttpResponse.json(myRequests.length > 0 ? myRequests : requests);
  }),

  // 4. GET /requests — Загальний список заявок для оператора з фільтрацією за статусом
  http.get('*/requests', async ({ request }) => {
    await delay(300);

    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const statusFilter = url.searchParams.get('status');

    let filteredRequests = requests;
    if (statusFilter && statusFilter !== 'all') {
      filteredRequests = requests.filter(r => r.statusId === statusFilter);
    }

    return HttpResponse.json(filteredRequests);
  }),

  // 5. GET /requests/:id — Детальна картка заявки з коментарями
  http.get('*/requests/:id', ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const item = requests.find(r => r.id === reqId) || requests[0];
    const reqComments = comments.filter(c => c.requestId === item.id);

    return HttpResponse.json({
      ...item,
      comments: reqComments,
    });
  }),

  // 6. POST /requests — Створення нової заявки клієнтом
  http.post('*/requests', async ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = (await request.json()) as any;

    const newRequest: ServiceRequest = {
      id: `req-${Math.random().toString(36).substring(2, 9)}`,
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
      priorityId: body.priorityId,
      statusId: 'new', // Нова заявка завжди стартує зі статусом "new"
      createdAt: new Date().toISOString(),
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: body.clientPhone || '+380501112233',
    };

    requests.unshift(newRequest);

    // Додаємо запис про створення в історію статусів
    statusHistory.push({
      id: `h-${Math.random().toString(36).substring(2, 9)}`,
      requestId: newRequest.id,
      oldStatusId: null,
      newStatusId: 'new',
      updatedBy: user.name,
      updatedAt: newRequest.createdAt,
    });

    return HttpResponse.json(newRequest, { status: 201 });
  }),

  // 7. PATCH /requests/:id/status — Зміна статусу заявки оператором
  http.patch('*/requests/:id/status', async ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const item = requests.find(r => r.id === reqId) || requests[0];
    const { statusId } = (await request.json()) as any;

    // Додаємо запис у таймлайн історії
    statusHistory.push({
      id: `h-${Math.random().toString(36).substring(2, 9)}`,
      requestId: item.id,
      oldStatusId: item.statusId,
      newStatusId: statusId,
      updatedBy: user.name,
      updatedAt: new Date().toISOString(),
    });

    item.statusId = statusId;

    return HttpResponse.json(item);
  }),

  // 8. POST /requests/:id/comments — Додавання коментаря оператором
  http.post('*/requests/:id/comments', async ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const { text } = (await request.json()) as any;

    const newComment = {
      id: `com-${Math.random().toString(36).substring(2, 9)}`,
      requestId: reqId,
      authorName: user.name,
      text,
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);

    return HttpResponse.json(newComment, { status: 201 });
  }),

  // 9. GET /requests/:id/history — Отримання історії статусів для заявки
  http.get('*/requests/:id/history', ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const reqHistory = statusHistory.filter(h => h.requestId === reqId);

    return HttpResponse.json(reqHistory);
  }),

  // 10. GET /categories — Довідник категорій
  http.get('*/categories', () => HttpResponse.json(categories)),

  // 11. GET /priorities — Довідник пріоритетів
  http.get('*/priorities', () => HttpResponse.json(priorities)),

  // 12. GET /request-statuses — Довідник статусів
  http.get('*/request-statuses', () => HttpResponse.json(statuses)),
];
