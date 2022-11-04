export default class BaseModel {
    name: string;

    constructor(_name: string) {
        this.name = _name;
    }

    isEqual(other: BaseModel): boolean {
        return this.name === other.name;
    }
}