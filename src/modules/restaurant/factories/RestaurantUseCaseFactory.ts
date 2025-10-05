import { PrismaMenuItemRepository } from "@/modules/menuItem/adapters/outbound/prisma/PrismaMenuItem.repository";
import { PrismaRestaurantRepository } from "../adapters/outbound/prisma/PrismaRestaurant.repository";
import { CreateRestaurantUseCase } from "../application/createRestaurant.useCase";
import { DeleteRestaurantUseCase } from "../application/deleteRestaurant.useCase";
import { ListRestaurantsUseCase } from "../application/listRestaursnts.useCase";
import { UpdateRestaurantUseCase } from "../application/updateRestaurant.useCase";

export class RestaurantUseCaseFactory {
    static createUseCases() {
        const restaurantRepo = new PrismaRestaurantRepository();
        const itemsRepo = new PrismaMenuItemRepository();
        return {
            createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo),
            listRestaurants: new ListRestaurantsUseCase(restaurantRepo),
            deleteRestaurant: new DeleteRestaurantUseCase(restaurantRepo, restaurantRepo, itemsRepo),
            updateRestaurant: new UpdateRestaurantUseCase(restaurantRepo, restaurantRepo)

        }
    }
}