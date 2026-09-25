import { redirect } from 'react-router-dom';
import { getSessionId, deleteSession, clearSession } from '@/entities/session';

export const clearSessionData = async (): Promise<void> => {
  const sessionId = getSessionId();
  if (sessionId) {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error('Error deleting TMDB session:', error);
    }
  }
  clearSession();
};

export const logoutAction = async () => {
  await clearSessionData();
  return redirect('/login');
};
