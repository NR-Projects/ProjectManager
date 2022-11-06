import BaseModel from "./BaseModel";

class ProjectTask extends BaseModel{
    id?: string;

    constructor(_name: string, _id?: string) {
        super(_name);

        this.id = _id;
    }
}

export default ProjectTask;