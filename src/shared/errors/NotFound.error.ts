export class NotFoundError extends Error {
    constructor(context: string, field: string = 'data') {
        super();
        this.message = `Not Found ${field} in ${context}`
       
    }
}