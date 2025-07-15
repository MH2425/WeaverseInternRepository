export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}