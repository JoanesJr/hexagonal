import { PersonalError } from "./Personal.error";

export class AlreadyExistsError extends PersonalError {
    constructor(entity: string) {
        super();
        this.message = `Data already exists in ${entity}`
       
    }
}