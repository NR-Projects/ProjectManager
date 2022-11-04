import TaskItem from "./TaskItem";

class ProjectTask {
    id: string;
    name: string;
    task_items: Array<TaskItem>;

    constructor(_id: string, _name: string, _task_items: Array<TaskItem>) {
        this.id = _id;
        this.name = _name;
        this.task_items = _task_items;
    }

    addTask(task: TaskItem): void {
        this.task_items.push(task);
    }

    removeTask(task: TaskItem): void {
        const r_index = this.task_items.indexOf(task);
        if (r_index < 0) return;
        delete this.task_items[r_index];
    }
}

export default ProjectTask;