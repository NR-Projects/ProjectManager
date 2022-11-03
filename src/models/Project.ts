class Project {

    id: string;
    name: string;
    date_created: Date;
    date_last_accessed: Date;

    constructor(_id: string, _name: string, _date_created: Date, _date_last_accessed: Date) {
        this.id = _id;
        this.name = _name;
        this.date_created = _date_created;
        this.date_last_accessed = _date_last_accessed;
    }
}

export default Project;