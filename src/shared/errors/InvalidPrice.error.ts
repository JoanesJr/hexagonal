export class InvalidPriceError extends Error {
    constructor(context: string) {
        super();
        this.message = `Price can't be more less 0 in ${context}`
       
    }
}