import BaseModel from "./BaseModel";

class ProjectTask extends BaseModel{
    id: string;

    constructor(_id: string, _name: string) {
        super(_name);

        this.id = _id;
    }
}

export default ProjectTask;