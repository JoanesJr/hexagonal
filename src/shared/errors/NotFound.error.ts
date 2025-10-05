import { PersonalError } from "./Personal.error";

export class NotFoundError extends PersonalError {
    constructor(context: string, field: string = 'data') {
        super();
        this.message = `Not Found ${field} in ${context}`
       
    }
}