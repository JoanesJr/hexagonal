import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { UpdateMenuItemSchema } from "../shared/schemas";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export class UpdateMenuItemConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'updateMenuItem', 
            schema: UpdateMenuItemSchema, 
            useCase: MenuItemUseCaseFactory.createUseCases().updateMenuItem,
            context: UpdateMenuItemConsumer.name,
            type: OPERATIONS_TYPE.UPDATE
        })
    }
}