import { PersonalError } from "./Personal.error";

export class MinLengthError extends PersonalError {
    constructor(field: string, min: number) {
        super();
        this.message = `This ${field} is required and need have min ${min} characters`;
    }
}