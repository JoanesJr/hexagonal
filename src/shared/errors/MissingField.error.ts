export class MissingFieldError extends Error {
    constructor(field?: string) {
        super();
        this.message = `Missing Required fields: ${field}`;
    }
}