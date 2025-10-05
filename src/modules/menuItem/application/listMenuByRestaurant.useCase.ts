import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";
import { ILoggerService } from "@/infra/logger/loggerService";

export class ListMenuByRestaurantUseCase {
    constructor(private readonly menuReader: IMenuItemReader, private readonly restaurantReader: IRestaurantReader, private readonly logger: ILoggerService) {};

    async execute(restaurantId: string) {
        const restaurant = await this.restaurantReader.findById(restaurantId);
        if (!restaurant) {
            this.logger.error(`${ListMenuByRestaurantUseCase.name} - NotFoundError`, {restaurantId});
            throw new NotFoundError(ListMenuByRestaurantUseCase.name, 'restaurant');
        }
        if (!restaurant.isOpen) {
            this.logger.error(`${ListMenuByRestaurantUseCase.name} - NotFoundError`, {restaurantId});
            throw new RestaurantIsClosedError(ListMenuByRestaurantUseCase.name);
        }

        const menu = await this.menuReader.findAllByRestaurant(restaurantId);
        this.logger.info(`${ListMenuByRestaurantUseCase.name} - success`, {restaurantId, menu});
        return menu;
    }
}