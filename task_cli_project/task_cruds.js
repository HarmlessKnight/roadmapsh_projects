import fs from 'fs';
import Task from './setup.js';

class TaskManager{    
    
    constructor(file ='save.json'){
        this.file = file;
        if(!fs.existsSync(this.file) || fs.statSync(this.file).size === 0){
            fs.writeFileSync(this.file, '[]');
        }
    
        this.tasks = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
    }

    save(){
        fs.writeFileSync(this.file, JSON.stringify(this.tasks, null, 2));
    }

    add(description)
    {
        
        let maxID = this.tasks.reduce((max, task) => {
            return task.id != null && task.id > max ? task.id : max;
        }, 0);

        const newTask = new Task(maxID + 1, description);
        console.log(`Task added successfully(ID: ${newTask.id})`);       
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }


    update(id, new_Description)
    {
        id = Number(id);
        let task = this.tasks.find(t => t.id == id);
        if(task){
            task.description = new_Description;
            task.UpdatedAt = Date.now();
            this.save();
            return true;
        }

        return false;
    }


    delete(id)
    {
        id = Number(id);
        let index = this.tasks.findIndex(task => task.id == id);
        if(index !== -1)
        {
            this.tasks.splice(index,1);
            this.save();
            console.log(`Task ${id} deleted`)
            return true;
        }
        return false;
            
    }

    list(list_status = null)
    {
        for(const task of this.tasks)
        {
            if(list_status === null || task.status === list_status)
                console.log(`ID: ${task.id} Task: ${task.description} Status: ${task.status}`);
        }
        
    }

   

    mark(id,new_status)
    {
        id = Number(id);
        let task = this.tasks.find(t => t.id == id);
        if(task)
        {
            task.status = new_status;
            this.save();
            return true;
        }
        return false;
    }

}   

export default TaskManager;