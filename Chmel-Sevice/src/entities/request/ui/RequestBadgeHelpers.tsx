import React from 'react';
import { Badge } from '../../../shared/ui/Badge';
import { categories, priorities, statuses } from '../../../shared/api/mock/db';

export const RequestStatusBadge: React.FC<{ statusId: string }> = ({ statusId }) => {
  const statusObj = statuses.find((s) => s.id === statusId);
  const name = statusObj ? statusObj.name : statusId;

  let variant: 'new' | 'in_progress' | 'resolved' | 'cancelled' = 'new';
  if (statusId === 'in_progress') variant = 'in_progress';
  if (statusId === 'resolved') variant = 'resolved';
  if (statusId === 'cancelled') variant = 'cancelled';

  return <Badge variant={variant}>{name}</Badge>;
};

export const RequestPriorityBadge: React.FC<{ priorityId: string }> = ({ priorityId }) => {
  const priorityObj = priorities.find((p) => p.id === priorityId);
  const name = priorityObj ? priorityObj.name : priorityId;

  let variant: 'high' | 'medium' | 'low' = 'low';
  if (priorityId === 'high') variant = 'high';
  if (priorityId === 'medium') variant = 'medium';

  return <Badge variant={variant}>{name}</Badge>;
};

export const RequestCategoryBadge: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const catObj = categories.find((c) => c.id === categoryId);
  const name = catObj ? catObj.name : categoryId;

  return <Badge variant="neutral">{name}</Badge>;
};
