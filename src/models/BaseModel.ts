export default class BaseModel {
    name: string;
    isEmpty: boolean

    constructor(_name: string, isModelNull?: boolean) {
        this.name = _name;
        this.isEmpty = false;

        if ( isModelNull ) this.isEmpty = isModelNull;
    }

    static createEmptyObject(): BaseModel {
        return new BaseModel("", true);
    }

    isEqual(other: BaseModel): boolean {
        return this.name === other.name;
    }

    isNull(): boolean {
        return this.isEmpty;
    }
}