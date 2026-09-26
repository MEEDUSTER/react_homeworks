import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/axiosInstance';
import { useToast } from '../../../shared/context/ToastContext';
import { Textarea } from '../../../shared/ui/Textarea';
import { Button } from '../../../shared/ui/Button';
import { Send } from 'lucide-react';

interface AddCommentFormProps {
  requestId: string;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ requestId }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (commentText: string) => {
      const response = await api.post(`/requests/${requestId}/comments`, { text: commentText });
      return response.data;
    },
    onSuccess: () => {
      setText('');
      setError('');
      queryClient.invalidateQueries({ queryKey: ['request', requestId] });
      showToast('Коментар успішно додано!', 'success');
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Помилка додавння коментаря.';
      showToast(msg, 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Введіть текст коментаря');
      return;
    }
    mutation.mutate(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Textarea
        label="Додати коментар оператора"
        placeholder="Напишіть відповідь або службову примітку..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError('');
        }}
        error={error}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" isLoading={mutation.isPending} size="sm">
          <Send size={14} /> Надіслати коментар
        </Button>
      </div>
    </form>
  );
};
