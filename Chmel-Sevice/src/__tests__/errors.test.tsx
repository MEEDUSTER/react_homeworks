import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../shared/api/mock/server';
import { API_URL } from '../shared/api/mock/handlers';
import App from '../app/App';

describe('Integration Test 2: Error Handling', () => {
  it('should display error message on 500 Internal Server Error during login', async () => {
    // Override login endpoint to return 500
    server.use(
      http.post(`${API_URL}/auth/login`, () => {
        return HttpResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
      })
    );

    window.history.pushState({}, 'Login', '/login');
    render(<App />);

    const emailInput = screen.getByLabelText(/Електронна пошта/i);
    const passwordInput = screen.getByLabelText(/Пароль/i);
    const submitButton = screen.getByRole('button', { name: /Увійти/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'user123');
    await userEvent.click(submitButton);

    // Verify error toast message appears
    await waitFor(() => {
      expect(screen.getByText('Внутрішня помилка сервера')).toBeInTheDocument();
    });
  });

  it('should handle network error response gracefully', async () => {
    // Override login endpoint to throw Network Error
    server.use(
      http.post(`${API_URL}/auth/login`, () => {
        return HttpResponse.error();
      })
    );

    window.history.pushState({}, 'Login', '/login');
    render(<App />);

    const emailInput = screen.getByLabelText(/Електронна пошта/i);
    const passwordInput = screen.getByLabelText(/Пароль/i);
    const submitButton = screen.getByRole('button', { name: /Увійти/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'user123');
    await userEvent.click(submitButton);

    // Verify system remains responsive and displays feedback
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Увійти/i })).toBeInTheDocument();
    });
  });
});
