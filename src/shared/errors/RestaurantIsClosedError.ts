import { PersonalError } from "./Personal.error";

export class RestaurantIsClosedError extends PersonalError {
    constructor(context: string, field: string = 'data') {
        super();
        this.message = `This restaurant is closed in ${context}`
       
    }
}