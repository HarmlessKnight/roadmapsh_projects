import fs from 'fs';
import TaskManager from './task_cruds.js'


if (!fs.existsSync('save.json')) {
  fs.writeFileSync('save.json', '[]');
}

let tsm = new TaskManager;

const args = process.argv.slice(2);


    let id, task_description, new_description;
    let list_status;
    let command = args[0];

    switch (command) 
    {
        case 'add':
            if(args.length < 2)
            {
                console.log("Missing arguments. Correct usage: add \"your task description\"");
                break;
            }
            task_description = args.slice(1).join(' ').replace(/"/g, '');
            tsm.add(task_description);
            break;

        case 'update':
            if(args.length < 3)
            {
                console.log("Missing arguments. Correct usage: update taskID \"new task description\"")
                break;
            }
            id = args[1];
            new_description = args.slice(2).join(' ').replace(/"/g, '');
            tsm.update(id, new_description);
            break;

        case 'delete':
            if(args.length < 2)
            {
                console.log("Missing arguments. Correct usage: delete taskID")
                break;
            }
            id = args[1];
            tsm.delete(id);
            break;

        case 'list':
            if(args.length == 1)
                tsm.list()
            else
                tsm.list(args[1])
            break;
            
        case'mark-in-progress':
        case'mark-done':
            if(args.length < 2)
            {
                console.log("Missing arguments. Correct usage: mark-in-progress taskID or mark-done taskID");
                break;
            }
            id = args[1];
            if(args[0].substring(5,7) == 'in')
                list_status = "in-progress";
            else
                list_status = "done";
            tsm.mark(id,list_status);
            break;
        default:
            console.log('Unknown command. Please use the following commands: add, update, delete, mark, list');
            break;
    }
