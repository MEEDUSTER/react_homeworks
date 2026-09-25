import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { loginUser, saveSession } from '@/entities/session';

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    return { error: "Всі поля обов'язкові для заповнення" };
  }

  try {
    const sessionId = await loginUser(username, password);
    saveSession(sessionId, username);
    return redirect('/');
  } catch (error: any) {
    const apiError =
      error?.response?.data?.status_message ||
      error?.message ||
      'Помилка автентифікації. Перевірте правильність введеного логіна та пароля.';
    return { error: apiError };
  }
}
