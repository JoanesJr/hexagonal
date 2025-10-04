import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";

export class ListMenuByRestaurantUseCase {
    constructor(private readonly menuReader: IMenuItemReader, private readonly restaurantReader: IRestaurantReader) {};

    async execute(restaurantId: string) {
        const restaurant = await this.restaurantReader.findById(restaurantId);
        if (!restaurant) {
            throw new NotFoundError(ListMenuByRestaurantUseCase.name, 'restaurant');
        }
        if (!restaurant.isOpen) {
            throw new RestaurantIsClosedError(ListMenuByRestaurantUseCase.name);
        }

        const menu = await this.menuReader.findAllByRestaurant(restaurantId);
        return menu;
    }
}