import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository";
import { PrismaMenuItemRepository } from "../adapters/outbound/prisma/PrismaMenuItem.repository";
import { CreateMenuItemUseCase } from "../application/createMenuItem.useCase";
import { ListMenuByRestaurantUseCase } from "../application/listMenuByRestaurant.useCase";
import { RemoveMenuItemUseCase } from "../application/removeMenuItem.useCase";
import { UpdateMenuItemUseCase } from "../application/updateMenuItem.useCase";

export class MenuItemUseCaseFactory {
    static createUseCases() {
        const menuItemRepo = new PrismaMenuItemRepository();
        const restaurantRepo = new PrismaRestaurantRepository();
        return {
            createMenuItem: new CreateMenuItemUseCase(menuItemRepo, menuItemRepo, restaurantRepo),
            listMenuByRestaurant: new ListMenuByRestaurantUseCase(menuItemRepo, restaurantRepo),
            removeMenuitem: new RemoveMenuItemUseCase(menuItemRepo, menuItemRepo),
            updateMenuItem: new UpdateMenuItemUseCase(menuItemRepo, menuItemRepo)
        }
    }
}