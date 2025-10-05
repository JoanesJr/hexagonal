import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { ILoggerService } from "@/infra/logger/loggerService";

export class ListRestaurantsUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader,
        private readonly logger: ILoggerService
    ){}

    async execute(onlyOpen: boolean = false) {
        const restaurants = onlyOpen ? await this.restaurantReader.findByField('isOpen', true) : await this.restaurantReader.findByAll();
        if (restaurants.length == 0) {
            this.logger.error(`${ListRestaurantsUseCase.name} - NoutFoundError`, {onlyOpen})
            throw new NotFoundError(ListRestaurantsUseCase.name);
        }
        this.logger.info(`${ListRestaurantsUseCase.name} - success`, {restaurants});
        return restaurants;
    }
}