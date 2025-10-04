import { MinLengthError } from "@/shared/errors/MinLengh.error"
import { MissingFieldError } from "@/shared/errors/MissingField.error";

export class Restaurant {
    constructor(
        public id: string | null,
        public name: string,
        public address: string,
        public isOpen: boolean
    ) {
        if (!name || !address) {
            throw new MissingFieldError();
        }
        if (name.length < 3 || address.length < 3) {
            throw new MinLengthError("name or address", 3);
        }

        if (isOpen == null || isOpen == undefined) {
            this.isOpen = false;
        }
    }
}