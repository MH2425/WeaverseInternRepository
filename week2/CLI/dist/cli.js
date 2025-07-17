"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const interactive_1 = require("./interactive");
const taskManager_1 = require("./taskManager");
const program = new commander_1.Command();
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
        await (0, interactive_1.interactiveMode)();
    }
    catch (err) {
        console.error(`Error in interactive mode: ${err}`);
    }
});
program
    .command("add")
    .description("Add a new task")
    .requiredOption("-t, --title <title>", "Task title")
    .requiredOption("-p, --priority <priority>", "Priority of the task")
    .action(async ({ title, priority }) => {
    try {
        await (0, taskManager_1.addTask)(title, priority);
    }
    catch (err) {
        console.error(`Error adding task: ${err}`);
    }
});
program
    .command("remove")
    .description("Remove a task by ID")
    .argument("<id>", "Task ID")
    .action(async (id) => {
    try {
        await (0, taskManager_1.removeTask)(parseInt(id, 10));
    }
    catch (err) {
        console.error(`Error adding task: ${err}`);
    }
});
program
    .command("update")
    .description("Update task by id")
    .argument("<id>", "Task ID")
    .action(async (id) => {
    try {
        await (0, taskManager_1.updateTask)(parseInt(id, 10));
    }
    catch (err) {
        console.log("Error updating task: ", err);
    }
});
program
    .command("list")
    .description("List all tasks")
    .option("-c, --completed <completed>", "Filter by completion (true | false)")
    .action(async (options) => {
    try {
        await (0, taskManager_1.listTasks)(options);
    }
    catch (err) {
        console.error("Error listing tasks: ", err);
    }
});
program.parse(process.argv);
