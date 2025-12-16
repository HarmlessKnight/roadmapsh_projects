export default class Task {
    constructor(id, description, status = "todo") {
        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}

