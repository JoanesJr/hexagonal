import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IRestaurantReader } from "../ports/IRestaurantReader";

export class ListRestaurantsUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader
    ){}

    async execute(onlyOpen: boolean = false) {
        const restaurants = onlyOpen ? await this.restaurantReader.findByField('isOpen', true) : await this.restaurantReader.findByAll();
        if (restaurants.length == 0) {
            throw new NotFoundError(ListRestaurantsUseCase.name);
        }

        return restaurants;
    }
}