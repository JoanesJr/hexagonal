import { Restaurant } from "@/modules/restaurant/domain/restaurant";;
import { CreateMenuItemSchema } from "../shared/schemas";
import { GenericConsumer, OPERATIONS_TYPE } from "@/shared/base/genericRabbitConsumer";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export class CreateMenuItemConsumer extends GenericConsumer<Restaurant> {
    constructor() {
        super({
            queue: 'createMenuItem', 
            schema: CreateMenuItemSchema, 
            useCase: MenuItemUseCaseFactory.createUseCases().createMenuItem,
            context: CreateMenuItemConsumer.name,
            type: OPERATIONS_TYPE.CREATE
        })
    }
}