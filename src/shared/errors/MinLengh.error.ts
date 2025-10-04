export class MinLengthError extends Error {
    constructor(field: string, min: number) {
        super();
        this.message = `This ${field} is required and need have min ${min} characters`;
    }
}