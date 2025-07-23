import { Command } from "commander";
import { interactiveMode } from './interactive';

const program = new Command();

program
  .name("task-manager")
  .description("CLI Application")
  .version("0.0.0");

program
  .command("interactive")
  .alias('i')
  .description("Start interactive mode")
  .action(async () => {
    try {
      await interactiveMode();
    } catch (err) {
      console.error(`Error in interactive mode: ${err}`);
    }
  });

// program
//   .command("add")
//   .description("Add a new task")
//   .requiredOption("-t, --title <title>", "Task title")
//   .requiredOption("-p, --priority <priority>", "Priority of the task")
//   .action(async ({ title, priority }) => {
//     try {
//       await addTask(title, priority);
//     } catch (err) {
//       console.error(`Error adding task: ${err}`);
//     }
//   });
   
// program
//   .command("remove")
//   .description("Remove a task by ID")
//   .argument("<id>", "Task ID")
//   .action(async (id) => {
//     try {
//       await removeTask(parseInt(id, 10));
//     } catch (err) {
//       console.error(`Error adding task: ${err}`);
//     }
//   });

// program
//   .command("update")
//   .description("Update task by id")
//   .argument("<id>", "Task ID")
//   .action(async (id) => {
//     try {
//       await updateTask(parseInt(id, 10));
//     } catch (err) {
//       console.log("Error updating task: ", err);
//     }
//   });

// program
//   .command("list")
//   .description("List all tasks")
//   .option("-c, --completed <completed>", "Filter by completion (true | false)")
//   .action(async (options) => {
//     try {
//       await listTasks(options);
//     } catch (err) {
//       console.error("Error listing tasks: ", err);
//     }
//   });

program.parse(process.argv);