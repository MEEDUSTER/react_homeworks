export type Role = 'user' | 'operator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
}

export interface Priority {
  id: string;
  name: string;
}

export interface RequestStatus {
  id: string;
  name: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  priorityId: string;
  statusId: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export interface Comment {
  id: string;
  requestId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface StatusHistoryEntry {
  id: string;
  requestId: string;
  oldStatusId: string | null;
  newStatusId: string;
  updatedBy: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  role: Role;
}

export interface RequestWithDetails extends ServiceRequest {
  comments?: Comment[];
}
