import { promises as fs } from "fs";
import { Task } from "./types";

const FILE = "tasks.json";

async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(tasks, null, 2));
}

function generateId(tasks: Task[]): number {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

export async function addTask(title: string, priority: Task['priority']): Promise<void> {
  const tasks = await loadTasks();
  const task: Task = {
    id: generateId(tasks),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    priority
  };
  tasks.push(task);
  await saveTasks(tasks);
  console.log(`Task ${task.id}: ${task.title} added at ${task.createdAt}`);
}

export async function removeTask(id: number): Promise<void> {
  const tasks = await loadTasks();
  const newTasks = tasks.filter(t => t.id !== id);
  if (newTasks.length === tasks.length) {
    console.log(`Task not found`);
  } else {
    await saveTasks(newTasks);
    console.log(`Task removed`);
  }
}

export async function updateTask(id: number): Promise<void> {
  const tasks = await loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log(`Task ID = ${id} not found`);
    return;
  }
  task.completed = !task.completed;
  await saveTasks(tasks);
  console.log(`Task ID = ${id} completed`);
}

export async function listTasks(options: any): Promise<void> {
  const tasks = await loadTasks();
  let filtered = tasks;
  
  if (options && options.completed) {
    const isCompleted = options.completed === 'true' || options.completed === true;
    filtered = tasks.filter(t => t.completed === isCompleted);
  }
  
  if (filtered.length === 0) {
    console.log(`No tasks found`);
    return;
  }
  
  console.table(filtered, ['id', 'title', 'completed', 'createdAt', 'priority']);
}