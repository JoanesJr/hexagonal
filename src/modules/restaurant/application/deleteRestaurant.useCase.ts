import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";

export class DeleteRestaurantUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader,
        private readonly restaurantWriter: IRestaurantWriter
    ) {}

    async execute(id: string) {
        const exists = await this.restaurantReader.findById(id);
        if (!exists) {
            throw new NotFoundError(DeleteRestaurantUseCase.name);
        }
        const deleted = await this.restaurantWriter.delete(id);
        return deleted;
    }
}