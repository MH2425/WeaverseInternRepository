// Basic CLI structure with Commander.js
import { Command } from 'commander';

const program = new Command();

program
  .name('task-manager')
  .description('CLI task management application')
  .version('1.0.0');

program
  .command('add <title>')
  .description('Add a new task')
  .option('-p, --priority <priority>', 'Set priority (low|medium|high)', 'medium')
  .action((title, options) => {
    console.log(`Adding task: ${title} with priority: ${options.priority}`);
  });

program.parse(process.argv);