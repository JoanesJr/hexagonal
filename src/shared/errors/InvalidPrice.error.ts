import { PersonalError } from "./Personal.error";

export class InvalidPriceError extends PersonalError {
    constructor(context?: string) {
        super();
        this.message = `Price can't be more less 0 ${context.length > 0 ? 'in ' + context : ''}`
    }
}