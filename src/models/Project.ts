import BaseModel from './BaseModel';

class Project extends BaseModel {

    desc: string;

    id?: string;
    date_created?: Date;
    date_last_updated?: Date;

    constructor(_name: string, _desc: string, _date_created?: Date, _date_last_updated?: Date, _id?: string) {
        super(_name);

        this.desc = _desc;

        this.id = _id;
        this.date_created = _date_created;
        this.date_last_updated = _date_last_updated;
    }

    areInputsValid(): boolean {
        if (this.name.trim().length === 0) return false;
        if (this.desc.trim().length === 0) return false;
        return true;
    }
}

export default Project;