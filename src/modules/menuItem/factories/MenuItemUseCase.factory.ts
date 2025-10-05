import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository";
import { PrismaMenuItemRepository } from "../adapters/outbound/prisma/PrismaMenuItem.repository";
import { CreateMenuItemUseCase } from "../application/createMenuItem.useCase";
import { ListMenuByRestaurantUseCase } from "../application/listMenuByRestaurant.useCase";
import { RemoveMenuItemUseCase } from "../application/removeMenuItem.useCase";
import { UpdateMenuItemUseCase } from "../application/updateMenuItem.useCase";
import { LoggerService } from "@/infra/logger/loggerService";

export class MenuItemUseCaseFactory {
    static createUseCases() {
        const menuItemRepo = new PrismaMenuItemRepository();
        const restaurantRepo = new PrismaRestaurantRepository();
        const logger = new LoggerService();
        return {
            createMenuItem: new CreateMenuItemUseCase(menuItemRepo, menuItemRepo, restaurantRepo, logger),
            listMenuByRestaurant: new ListMenuByRestaurantUseCase(menuItemRepo, restaurantRepo, logger),
            removeMenuitem: new RemoveMenuItemUseCase(menuItemRepo, menuItemRepo, logger),
            updateMenuItem: new UpdateMenuItemUseCase(menuItemRepo, menuItemRepo, logger)
        }
    }
}