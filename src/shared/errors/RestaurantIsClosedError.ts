export class RestaurantIsClosedError extends Error {
    constructor(context: string, field: string = 'data') {
        super();
        this.message = `This restaurant is closed in ${context}`
       
    }
}