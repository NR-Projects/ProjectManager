import BaseModel from './BaseModel';

class Project extends BaseModel {

    desc: string;

    id: string | undefined;
    date_created: Date | undefined;
    date_last_updated: Date | undefined;

    constructor(_name: string, _desc: string, _date_created?: Date, _date_last_updated?: Date, _id?: string) {
        super(_name);

        this.desc = _desc;

        if (_id) this.id = _id;
        if (_date_created) this.date_created = _date_created;
        if (_date_last_updated) this.date_last_updated = _date_last_updated;
    }
}

export default Project;