import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import {  UpdateRestaurantSchema } from "../shared/schemas";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";

export class UpdateRestauranteConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'updateRestaurant', 
            schema: UpdateRestaurantSchema, 
            useCase: RestaurantUseCaseFactory.createUseCases().updateRestaurant,
            context: UpdateRestauranteConsumer.name,
            type: OPERATIONS_TYPE.UPDATE
        })
    }
}