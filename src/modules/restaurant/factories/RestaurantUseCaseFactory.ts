import { PrismaMenuItemRepository } from "@/modules/menuItem/adapters/outbound/prisma/PrismaMenuItem.repository";
import { PrismaRestaurantRepository } from "../adapters/outbound/prisma/PrismaRestaurant.repository";
import { CreateRestaurantUseCase } from "../application/createRestaurant.useCase";
import { DeleteRestaurantUseCase } from "../application/deleteRestaurant.useCase";
import { ListRestaurantsUseCase } from "../application/listRestaursnts.useCase";
import { UpdateRestaurantUseCase } from "../application/updateRestaurant.useCase";
import { LoggerService } from "@/infra/logger/loggerService";

export class RestaurantUseCaseFactory {
    static createUseCases() {
        const restaurantRepo = new PrismaRestaurantRepository();
        const itemsRepo = new PrismaMenuItemRepository();
        const logger = new LoggerService();
        return {
            createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo, logger),
            listRestaurants: new ListRestaurantsUseCase(restaurantRepo, logger),
            deleteRestaurant: new DeleteRestaurantUseCase(restaurantRepo, restaurantRepo, itemsRepo, logger),
            updateRestaurant: new UpdateRestaurantUseCase(restaurantRepo, restaurantRepo, logger)

        }
    }
}