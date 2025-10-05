import { PersonalError } from "./Personal.error";

export class MissingFieldError extends PersonalError {
    constructor(field?: string) {
        super();
        this.message = `Missing Required fields: ${field}`;
    }
}