import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../shared/api/mock/server';
import { resetMockDb } from '../shared/api/mock/db';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  resetMockDb();
  localStorage.clear();
});
afterAll(() => server.close());
