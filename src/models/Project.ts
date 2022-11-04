import ProjectTask from './ProjectTask';

class Project {

    id: string;
    name: string;
    date_created: Date;
    date_last_accessed: Date;

    desc: string | undefined;
    project_tasks: Array<ProjectTask> | undefined

    constructor(_id: string, _name: string, _date_created: Date, _date_last_accessed: Date, _desc?: string, _project_tasks?: Array<ProjectTask>) {
        this.id = _id;
        this.name = _name;
        this.date_created = _date_created;
        this.date_last_accessed = _date_last_accessed;
        
        if (_desc) this.desc = _desc;
        if (_project_tasks) this.project_tasks = _project_tasks;
    }

    addProjectTask(project_task: ProjectTask): void {
        if (!this.project_tasks) return;
        this.project_tasks.push(project_task);
    }

    removeProjectTask(project_task: ProjectTask): void {
        if (!this.project_tasks) return;
        const r_index = this.project_tasks.indexOf(project_task);
        if (r_index < 0) return;
        delete this.project_tasks[r_index];
    }
}

export default Project;