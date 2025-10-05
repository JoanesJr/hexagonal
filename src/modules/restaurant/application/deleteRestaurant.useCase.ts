import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";
import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { RestaurantHaveItemsError } from "@/shared/errors/RestaurantHaveItemsError";
import { ILoggerService } from "@/infra/logger/loggerService";

export class DeleteRestaurantUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader,
        private readonly restaurantWriter: IRestaurantWriter,
        private readonly menuItemReader: IMenuItemReader,
        private readonly logger: ILoggerService,
    ) {}

    async execute(id: string) {
        const exists = await this.restaurantReader.findById(id);
        if (!exists) {
            this.logger.error(`DeleteRestaurantUseCase.name - NotFoundError`, {id})
            throw new NotFoundError(DeleteRestaurantUseCase.name);
        }
        const items = await this.menuItemReader.findAllByRestaurant(exists.id);
        if (items.length > 0) {
            throw new RestaurantHaveItemsError();
        }
        const deleted = await this.restaurantWriter.delete(id);
        this.logger.info(`${DeleteRestaurantUseCase.name} - success`, {id});
        return deleted;
    }
}