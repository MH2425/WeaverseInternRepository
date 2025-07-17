"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.removeTask = removeTask;
exports.updateTask = updateTask;
exports.listTasks = listTasks;
const fs_1 = require("fs");
const FILE = "tasks.json";
async function loadTasks() {
    try {
        const data = await fs_1.promises.readFile(FILE, "utf-8");
        return JSON.parse(data);
    }
    catch (_a) {
        return [];
    }
}
async function saveTasks(tasks) {
    await fs_1.promises.writeFile(FILE, JSON.stringify(tasks, null, 2));
}
function generateId(tasks) {
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}
async function addTask(title, priority) {
    const tasks = await loadTasks();
    const task = {
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
async function removeTask(id) {
    const tasks = await loadTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    if (newTasks.length === tasks.length) {
        console.log(`Task not found`);
    }
    else {
        await saveTasks(newTasks);
        console.log(`Task removed`);
    }
}
async function updateTask(id) {
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
async function listTasks(options) {
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
