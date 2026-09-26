import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/axiosInstance';
import { useToast } from '../../../shared/context/ToastContext';
import { statuses } from '../../../shared/api/mock/db';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';
import { RefreshCw } from 'lucide-react';

interface StatusChangeFormProps {
  requestId: string;
  currentStatusId: string;
}

export const StatusChangeForm: React.FC<StatusChangeFormProps> = ({ requestId, currentStatusId }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatusId);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  React.useEffect(() => {
    setSelectedStatus(currentStatusId);
  }, [currentStatusId]);

  const mutation = useMutation({
    mutationFn: async (newStatusId: string) => {
      const response = await api.patch(`/requests/${requestId}/status`, { statusId: newStatusId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['request', requestId] });
      queryClient.invalidateQueries({ queryKey: ['request-history', requestId] });
      queryClient.invalidateQueries({ queryKey: ['all-requests'] });
      showToast('Статус заявки успішно оновлено!', 'success');
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Помилка оновлення статусу.';
      showToast(msg, 'error');
    },
  });

  const handleUpdate = () => {
    if (selectedStatus === currentStatusId) return;
    mutation.mutate(selectedStatus);
  };

  const statusOptions = statuses.map((s) => ({ value: s.id, label: s.name }));

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <Select
          label="Змінити статус заявки"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={statusOptions}
        />
      </div>
      <Button
        onClick={handleUpdate}
        isLoading={mutation.isPending}
        disabled={selectedStatus === currentStatusId}
        size="md"
      >
        <RefreshCw size={16} /> Оновити статус
      </Button>
    </div>
  );
};
