import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../app/App';

describe('Integration Test 1: Authentication Flow', () => {
  it('should successfully log in as a user, fetch profile, and navigate to requests page', async () => {
    window.history.pushState({}, 'Login', '/login');
    render(<App />);

    // Check login form fields are rendered
    const emailInput = screen.getByLabelText(/Електронна пошта/i);
    const passwordInput = screen.getByLabelText(/Пароль/i);
    const submitButton = screen.getByRole('button', { name: /Увійти/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Fill form credentials
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'user123');

    // Click submit
    await userEvent.click(submitButton);

    // Verify successful login navigation & user profile display in header
    await waitFor(() => {
      expect(screen.getByText('Іван Клієнт')).toBeInTheDocument();
      expect(screen.getByText('Клієнт')).toBeInTheDocument();
      expect(screen.getByText('Мої сервісні заявки')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
