import { InMemoryMenuItemRepository } from "@/modules/menuItem/adapters/outbound/inMemory/InMemoryMenuItemRepository";
import { PrismaMenuItemRepository } from "@/modules/menuItem/adapters/outbound/prisma/PrismaMenuItem.repository";
import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { IMenuItemWriter } from "@/modules/menuItem/ports/IMenuItemWriter";
import { InMemoryRestaurantRepository } from "@/modules/restaurant/adapters/outbound/inMemory/InMemoryRestaurantRepository"
import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository"
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader"
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter"

interface IDeps {
    restaurantRepo: IRestaurantReader & IRestaurantWriter;
    menuItemsRepo: IMenuItemReader & IMenuItemWriter;
}

export type CreateDeps = () => IDeps;
export class TestSuitFactory {
    static createInMemory(): IDeps {
        return {
            restaurantRepo: new InMemoryRestaurantRepository(),
            menuItemsRepo: new InMemoryMenuItemRepository(),
        }
    }
    static createPrisma(): IDeps {
        return {
            restaurantRepo: new PrismaRestaurantRepository(),
            menuItemsRepo: new PrismaMenuItemRepository(),
        }
    }
}