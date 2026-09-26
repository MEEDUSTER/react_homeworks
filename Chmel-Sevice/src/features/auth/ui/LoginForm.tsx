import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../entities/user/model/AuthContext';
import { useToast } from '../../../shared/context/ToastContext';
import { api } from '../../../shared/api/axiosInstance';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Lock, Mail, UserCheck, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email є обов\'язковим').email('Введіть коректну електронну пошту'),
  password: z.string().min(1, 'Пароль є обов\'язковим').min(6, 'Пароль має містити щонайменше 6 символів'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (role: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Focus Email input on mount using useRef
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      const response = await api.post<{ accessToken: string; role: 'user' | 'operator' }>('/auth/login', data);
      await login(response.data.accessToken, response.data.role);
      showToast('Успішний вхід у систему!', 'success');
      onSuccess(response.data.role);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Помилка авторизації. Перевірте вхідні дані.';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillQuickLogin = (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
    onSubmit({ email, password: pass });
  };

  const { ref: registerEmailRef, ...emailRest } = register('email');

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <Input
          label="Електронна пошта"
          type="email"
          placeholder="user@example.com"
          error={errors.email?.message}
          {...emailRest}
          ref={(e) => {
            registerEmailRef(e);
            emailInputRef.current = e;
          }}
        />

        <Input
          label="Пароль"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" isLoading={isSubmitting} size="lg" style={{ marginTop: '8px', width: '100%' }}>
          <Lock size={18} /> Увійти
        </Button>
      </form>

      {/* Quick Login Presets for convenient testing */}
      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '10px', textAlign: 'center' }}>
          Швидкий доступ для тестування:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => fillQuickLogin('user@example.com', '123456')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: 'var(--radius-md)',
              color: '#60a5fa',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <UserCheck size={14} /> Клієнт
          </button>
          <button
            type="button"
            onClick={() => fillQuickLogin('operator@example.com', '123456')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: 'var(--radius-md)',
              color: '#c084fc',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <ShieldCheck size={14} /> Оператор
          </button>
        </div>
      </div>
    </div>
  );
};
