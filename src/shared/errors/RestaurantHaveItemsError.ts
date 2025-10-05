import { PersonalError } from "./Personal.error";

export class RestaurantHaveItemsError extends PersonalError {
    constructor() {
        super();
        this.message = `This restaurant have items`
       
    }
}