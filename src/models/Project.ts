import BaseModel from './BaseModel';

class Project extends BaseModel {

    id: string;
    date_created: Date;
    date_last_updated: Date;

    desc: string | undefined;

    constructor(_id: string, _name: string, _date_created: Date, _date_last_updated: Date, _desc?: string) {
        super(_name);

        this.id = _id;
        this.date_created = _date_created;
        this.date_last_updated = _date_last_updated;
        
        if (_desc) this.desc = _desc;
    }
}

export default Project;