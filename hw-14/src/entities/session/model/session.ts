export const isSessionActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('tmdb_session_id');
  return Boolean(token);
};

export const getSessionId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tmdb_session_id');
};

export const getUsername = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('username');
};

export const saveSession = (sessionId: string, username: string): void => {
  localStorage.setItem('tmdb_session_id', sessionId);
  localStorage.setItem('username', username);
  window.dispatchEvent(new Event('auth-updated'));
};

export const clearSession = (): void => {
  localStorage.removeItem('tmdb_session_id');
  localStorage.removeItem('username');
  window.dispatchEvent(new Event('auth-updated'));
};
