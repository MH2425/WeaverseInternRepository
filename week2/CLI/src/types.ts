interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export function filterTasksByPriority(tasks: Task[], priority: Task['priority']) : Task[] {
  return tasks.filter(task => task.priority === priority);
}

