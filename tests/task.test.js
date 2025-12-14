import fs from 'fs';
import assert from 'assert';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve CLI path (ES modules safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliPath = path.resolve(__dirname, '../task-cli.js');

const DATA_FILE = 'save.json';

// ---------- Helpers ----------
function resetFile() {
    fs.writeFileSync(DATA_FILE, '[]');
}

function readTasks() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// ---------- START ----------
console.log('🧪 Starting Task Tracker CLI tests...');
resetFile();

// ---------- ADD ----------
execSync(`node ${cliPath} add "Buy groceries"`);
let tasks = readTasks();

assert.strictEqual(tasks.length, 1);
assert.strictEqual(tasks[0].description, 'Buy groceries');
assert.strictEqual(tasks[0].status, 'todo');
assert(tasks[0].createdAt);
assert(tasks[0].updatedAt);

console.log('✅ Add task works');

// ---------- UPDATE ----------
execSync(`node ${cliPath} update 1 "Buy groceries and cook dinner"`);
tasks = readTasks();

assert.strictEqual(tasks[0].description, 'Buy groceries and cook dinner');
assert(tasks[0].updatedAt >= tasks[0].createdAt);

console.log('✅ Update task works');

// ---------- MARK IN PROGRESS ----------
execSync(`node ${cliPath} mark-in-progress 1`);
tasks = readTasks();

assert.strictEqual(tasks[0].status, 'in-progress');
console.log('✅ Mark in-progress works');

// ---------- MARK DONE ----------
execSync(`node ${cliPath} mark-done 1`);
tasks = readTasks();

assert.strictEqual(tasks[0].status, 'done');
console.log('✅ Mark done works');

// ---------- LIST ----------
let output = execSync(`node ${cliPath} list`).toString();
assert(output.includes('Buy groceries and cook dinner'));
console.log('✅ List all tasks works');

// ---------- LIST BY STATUS ----------
output = execSync(`node ${cliPath} list done`).toString();
assert(output.includes('done'));

output = execSync(`node ${cliPath} list todo`).toString();
assert(!output.includes('Buy groceries'));

console.log('✅ List by status works');

// ---------- DELETE ----------
execSync(`node ${cliPath} delete 1`);
tasks = readTasks();

assert.strictEqual(tasks.length, 0);
console.log('✅ Delete task works');

// ---------- INVALID COMMAND ----------
try {
    execSync(`node ${cliPath} nonsense`);
} catch (e) {
    assert(e.stderr.toString().includes('Unknown command'));
}

console.log('✅ Invalid command handled');

// ---------- FINISH ----------
console.log('🎉 All CLI tests passed!');
