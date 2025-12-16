# Task Tracker CLI

A simple command-line application to track your tasks.  
You can add, update, delete, and mark tasks as in-progress or done.  
Tasks are stored in a local JSON file (`save.json`) for persistence.

This project is part of my learning journey following [roadmap.sh](https://roadmap.sh/projects/task-tracker) projects and practicing JavaScript and frontend development concepts.

---

## Requirements
- Node.js (v18+ recommended)

---

## Installation
1. Clone the repository:
git clone <your-repo-url>
cd <your-project-folder>

2. No dependencies required — just Node.js.

---

## Usage

Run the CLI with Node.js:

node task-cli.js <command> [arguments]

### Commands

- Add a task:
node task-cli.js add "Buy groceries"

- Update a task:
node task-cli.js update 1 "Buy groceries and cook dinner"

- Delete a task:
node task-cli.js delete 1

- Mark task as in-progress:
node task-cli.js mark-in-progress 1

- Mark task as done:
node task-cli.js mark-done 1

- List all tasks:
node task-cli.js list

- List tasks by status:
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done

---

## Task Properties

Each task stored in `save.json` has the following:

- id: unique task identifier
- description: task description
- status: todo, in-progress, or done
- createdAt: timestamp when the task was created
- updatedAt: timestamp when the task was last updated

---

## Testing

The project includes simple tests for both unit and CLI behavior.  
Tests check that:

- Tasks can be added, updated, deleted, and marked correctly
- Listing tasks works for all statuses
- Invalid commands and IDs are handled gracefully
- Timestamps are set correctly
- JSON file (`save.json`) is updated as expected

To run the tests:

node tests/task.test.js

---

## Notes

- save.json is created automatically if it doesn’t exist.  
- This project is CLI-only and beginner-friendly.  
- No external libraries are required.  
- Part of my personal learning journey to practice JavaScript, Node.js, and frontend concepts.  
- Project page on roadmap.sh: [Task Tracker](https://roadmap.sh/projects/task-tracker)

---

## License

This project is for learning purposes.
