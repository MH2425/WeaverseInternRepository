"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveMode = interactiveMode;
const inquirer_1 = __importDefault(require("inquirer"));
const taskManager_1 = require("./taskManager");
async function interactiveMode() {
    console.log('Welcome to Task Manager Interactive Mode');
    console.log('Type "quit" to exit');
    let running = true;
    while (running) {
        const { command } = await inquirer_1.default.prompt({
            type: 'list',
            name: 'command',
            message: 'What would you like to do?',
            choices: ['add', 'list', 'update', 'remove', 'quit']
        });
        if (command === 'quit') {
            console.log('Goodbye!');
            running = false;
            continue;
        }
        try {
            switch (command) {
                case 'add':
                    await handleAddTask();
                    break;
                case 'list':
                    await handleListTasks();
                    break;
                case 'update':
                    await handleUpdateTask();
                    break;
                case 'remove':
                    await handleRemoveTask();
                    break;
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
        console.log('\n');
    }
}
async function handleAddTask() {
    const { title, priority } = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter task title:',
            validate: (input) => input.trim() !== '' ? true : 'Title cannot be empty'
        },
        {
            type: 'list',
            name: 'priority',
            message: 'Select priority:',
            choices: ['low', 'medium', 'high']
        }
    ]);
    await (0, taskManager_1.addTask)(title, priority);
}
async function handleListTasks() {
    const { filter } = await inquirer_1.default.prompt({
        type: 'list',
        name: 'filter',
        message: 'Filter tasks by completion status:',
        choices: ['all', 'completed', 'incomplete']
    });
    let options = {};
    if (filter === 'completed')
        options = { completed: true };
    if (filter === 'incomplete')
        options = { completed: false };
    await (0, taskManager_1.listTasks)(options);
}
async function handleUpdateTask() {
    const { id } = await inquirer_1.default.prompt({
        type: 'input',
        name: 'id',
        message: 'Enter the task ID to toggle completion status:',
        validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid number'
    });
    await (0, taskManager_1.updateTask)(parseInt(id, 10));
}
async function handleRemoveTask() {
    const { id } = await inquirer_1.default.prompt({
        type: 'input',
        name: 'id',
        message: 'Enter the task ID to remove:',
        validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid number'
    });
    await (0, taskManager_1.removeTask)(parseInt(id, 10));
}
