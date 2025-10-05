import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { CreateRestaurantSchema } from "../shared/schemas";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";

export class CreateRestauranteConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'createRestaurant', 
            schema: CreateRestaurantSchema, 
            useCase: RestaurantUseCaseFactory.createUseCases().createRestaurant,
            context: CreateRestauranteConsumer.name,
            type: OPERATIONS_TYPE.CREATE
        })
    }
}