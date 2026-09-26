import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/axiosInstance';
import { useToast } from '../../../shared/context/ToastContext';
import { ServiceRequest } from '../../../shared/types';
import { categories, priorities } from '../../../shared/api/mock/db';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Textarea } from '../../../shared/ui/Textarea';
import { Button } from '../../../shared/ui/Button';
import { PlusCircle, ArrowLeft } from 'lucide-react';

const createRequestSchema = z.object({
  title: z.string().min(5, 'Тема має містити щонайменше 5 символів').max(100, 'Тема занадто довга'),
  description: z.string().min(10, 'Опис має містити щонайменше 10 символів'),
  categoryId: z.string().min(1, 'Оберіть категорію'),
  priorityId: z.string().min(1, 'Оберіть пріоритет'),
  clientPhone: z.string().min(10, 'Введіть коректний номер телефону (наприклад: +380501112233)'),
});

type CreateRequestFormData = z.infer<typeof createRequestSchema>;

export const CreateRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: 'tech',
      priorityId: 'medium',
      clientPhone: '+380501112233',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateRequestFormData) => {
      const response = await api.post<ServiceRequest>('/requests', data);
      return response.data;
    },
    onSuccess: (newRequest) => {
      queryClient.invalidateQueries({ queryKey: ['my-requests'] });
      queryClient.invalidateQueries({ queryKey: ['all-requests'] });
      showToast(`Заявку #${newRequest.id} успішно створено!`, 'success');
      navigate(`/requests/${newRequest.id}`);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Помилка при створенні заявки.';
      showToast(msg, 'error');
    },
  });

  const onSubmit = (data: CreateRequestFormData) => {
    mutation.mutate(data);
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));
  const priorityOptions = priorities.map((p) => ({ value: p.id, label: p.name }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input
        label="Тема заявки *"
        placeholder="Короткий заголовок вашої проблеми"
        error={errors.title?.message}
        {...register('title')}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Select
          label="Категорія *"
          options={categoryOptions}
          error={errors.categoryId?.message}
          {...register('categoryId')}
        />

        <Select
          label="Пріоритет *"
          options={priorityOptions}
          error={errors.priorityId?.message}
          {...register('priorityId')}
        />
      </div>

      <Input
        label="Контактний номер телефону *"
        placeholder="+380501112233"
        error={errors.clientPhone?.message}
        {...register('clientPhone')}
      />

      <Textarea
        label="Детальний опис проблеми *"
        placeholder="Опишіть ситуацію максимально детально..."
        error={errors.description?.message}
        {...register('description')}
      />

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button type="button" variant="outline" onClick={() => navigate('/requests')}>
          <ArrowLeft size={16} /> Скасувати
        </Button>
        <Button type="submit" isLoading={mutation.isPending}>
          <PlusCircle size={18} /> Створити заявку
        </Button>
      </div>
    </form>
  );
};
