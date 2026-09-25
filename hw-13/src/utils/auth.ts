import { redirect } from 'react-router-dom';
import { deleteSession } from '@/services/tmdbApi';

export const requireAuthLoader = () => {
  const token = localStorage.getItem('tmdb_session_id');
  if (!token) {
    return redirect('/login');
  }
  return null;
};

export const logoutAction = async () => {
  const sessionId = localStorage.getItem('tmdb_session_id');
  if (sessionId) {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error('Error deleting session from TMDB:', error);
    }
  }

  localStorage.removeItem('tmdb_session_id');
  localStorage.removeItem('username');
  window.dispatchEvent(new Event('auth-updated'));

  return redirect('/login');
};
