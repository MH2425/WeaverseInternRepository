import { promises as fs } from "fs";
import { Task, Priority, Status } from "./types";

const FILE = "task.json";

async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(tasks, null, 2));
}

function generateId(tasks: Task[]): number {
  return tasks.length ?
    Math.max(...tasks.map(t => t.id)) + 1 : 1;
} 

