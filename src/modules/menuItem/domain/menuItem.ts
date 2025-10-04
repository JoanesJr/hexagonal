import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { MinLengthError } from "@/shared/errors/MinLengh.error";
import { MissingFieldError } from "@/shared/errors/MissingField.error";

export class MenuItem {
    constructor(
        public id: string | null,
        public name: string,
        public description: string,
        public price: number,
        public restaurantId: string
    ) {
        if (!name || !description || price == null || price == undefined || !restaurantId) {
            throw new MissingFieldError();
        }
        if (name.length < 3 || description.length < 3) {
            throw new MinLengthError("name or description", 3);
        }
        if (price < 0) {
            throw new InvalidPriceError();
        }
    }
}