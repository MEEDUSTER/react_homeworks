import { tmdbClient } from '@/shared/api';

// Отримання тимчасового токена запиту
export const getRequestToken = async (): Promise<string> => {
  const response = await tmdbClient.get('/authentication/token/new');
  return response.data.request_token;
};

// Валідація токена за допомогою логіна й пароля
export const validateTokenWithLogin = async (
  username: string,
  password: string,
  requestToken: string
): Promise<string> => {
  const response = await tmdbClient.post('/authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken,
  });
  return response.data.request_token;
};

// Створення сесії
export const createSessionId = async (requestToken: string): Promise<string> => {
  const response = await tmdbClient.post('/authentication/session/new', {
    request_token: requestToken,
  });
  return response.data.session_id;
};

// Видалення сесії
export const deleteSession = async (sessionId: string): Promise<boolean> => {
  const response = await tmdbClient.delete('/authentication/session', {
    data: { session_id: sessionId },
  });
  return response.data.success;
};

// Хелпер входу (3-етапний процес)
export const loginUser = async (username: string, password: string): Promise<string> => {
  const token = await getRequestToken();
  const validatedToken = await validateTokenWithLogin(username, password, token);
  const sessionId = await createSessionId(validatedToken);
  return sessionId;
};
