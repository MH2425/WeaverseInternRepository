import inquirer from 'inquirer';
import { addTask, removeTask, updateTask, listTasks } from './taskManager';

export async function interactiveMode() {
  console.log('Welcome to Task Manager Interactive Mode');
  console.log('Type "quit" to exit');
  
  let running = true;
  
  while (running) {
    const { command } = await inquirer.prompt({
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
    } catch (error) {
      console.error('Error:', error);
    }
    
    console.log('\n');
  }
}

async function handleAddTask() {
  const { title, priority } = await inquirer.prompt([
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
  
  await addTask(title, priority);
}

async function handleListTasks() {
  const { filter } = await inquirer.prompt({
    type: 'list',
    name: 'filter',
    message: 'Filter tasks by completion status:',
    choices: ['all', 'completed', 'incomplete']
  });
  
  let options = {};
  if (filter === 'completed') options = { completed: true };
  if (filter === 'incomplete') options = { completed: false };
  
  await listTasks(options);
}

async function handleUpdateTask() {
  const { id } = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Enter the task ID to toggle completion status:',
    validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid number'
  });
  
  await updateTask(parseInt(id, 10));
}

async function handleRemoveTask() {
  const { id } = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Enter the task ID to remove:',
    validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid number'
  });
  
  await removeTask(parseInt(id, 10));
}