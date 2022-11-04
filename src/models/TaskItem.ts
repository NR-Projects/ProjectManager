class TaskItem {
    id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    date_created: Date;
    date_last_updated: Date;

    constructor(_id: string, _name: string, _desc: string, _status: TaskStatus, _date_created: Date, _date_last_updated: Date) {
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.status = _status;
        this.date_created = _date_created;
        this.date_last_updated = _date_last_updated;
    }
}

enum TaskStatus {
    NotYetStarted,
    CheckingViability,
    InProgress,
    Finished
}

export default TaskItem;
export { TaskStatus };