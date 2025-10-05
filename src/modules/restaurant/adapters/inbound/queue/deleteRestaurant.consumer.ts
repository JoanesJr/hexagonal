import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";

export class DeleteRestauranteConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'deleteRestaurant', 
            useCase: RestaurantUseCaseFactory.createUseCases().deleteRestaurant,
            context: DeleteRestauranteConsumer.name,
            type: OPERATIONS_TYPE.DELETE
        })
    }
}