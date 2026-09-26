import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role } from '../../../shared/types';
import { api } from '../../../shared/api/axiosInstance';

/**
 * Інтерфейс глобального контексту авторизації.
 * Зберігає поточного користувача, токен, роль та функції для входу/виходу.
 */
interface AuthContextType {
  user: User | null;
  role: Role | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, userRole: Role) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Провайдер стану авторизації.
 * Автоматично відновлює сесію з localStorage та завантажує профіль через GET /auth/me
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Відновлюємо токен та роль із локального сховища при першому рендері
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [role, setRole] = useState<Role | null>(() => (localStorage.getItem('userRole') as Role) || null);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Запит до backend/MSW для отримання актуального профілю авторизованого користувача
  const fetchProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.get<User>('/auth/me');
      setUser(res.data);
      setRole(res.data.role);
      localStorage.setItem('userData', JSON.stringify(res.data));
      localStorage.setItem('userRole', res.data.role);
    } catch (err) {
      // Якщо токен недійсний або трапилась 401 помилка — скидаємо авторизацію
      setUser(null);
      setToken(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Слухаємо глобальну подію auth:unauthorized для миттєвого виходу при 401 відповіді від Axios
  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setRole(null);
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  // Успішний вхід у систему — зберігаємо токен та отримуємо дані користувача
  const login = async (accessToken: string, userRole: Role) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRole', userRole);
    setToken(accessToken);
    setRole(userRole);
    
    try {
      const res = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUser(res.data);
      localStorage.setItem('userData', JSON.stringify(res.data));
    } catch (e) {
      console.error('Не вдалося завантажити профіль користувача після входу:', e);
    }
  };

  // Вихід із системи — очищаємо localStorage та оновлюємо стан
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refetchUser: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Кастомний хук для зручного використання контексту авторизації у компонентах
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth можна використовувати тільки всередині AuthProvider');
  }
  return context;
};
