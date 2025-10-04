import { PrismaRestaurantRepository } from "../adapters/outbound/prisma/PrismaRestaurant.repository";
import { CreateRestaurantUseCase } from "../application/createRestaurant.useCase";
import { ListRestaurantsUseCase } from "../application/listRestaursnts.useCase";

export class RestaurantUseCaseFactory {
    static createUseCases() {
        const repo = new PrismaRestaurantRepository();
        return {
            createRestaurant: new CreateRestaurantUseCase(repo, repo),
            listRestaurants: new ListRestaurantsUseCase(repo)

        }
    }
}