import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export class DeleteMenuItemConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'deleteMenuItem', 
            useCase: MenuItemUseCaseFactory.createUseCases().removeMenuitem,
            context: DeleteMenuItemConsumer.name,
            type: OPERATIONS_TYPE.DELETE
        })
    }
}