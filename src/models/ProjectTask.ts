import BaseModel from "./BaseModel";

class ProjectTask extends BaseModel{
    id?: string;

    constructor(_name: string, _id?: string) {
        super(_name);

        this.id = _id;
    }

    areInputsValid(): boolean {
        if (this.name.trim().length === 0) return false;
        return true;
    }
}

export default ProjectTask;