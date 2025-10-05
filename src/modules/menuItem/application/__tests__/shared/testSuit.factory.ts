import { InMemoryMenuItemRepository } from "@/modules/menuItem/adapters/outbound/inMemory/InMemoryMenuItemRepository"
import { PrismaMenuItemRepository } from "@/modules/menuItem/adapters/outbound/prisma/PrismaMenuItem.repository";
import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { IMenuItemWriter } from "@/modules/menuItem/ports/IMenuItemWriter";
import { InMemoryRestaurantRepository } from "@/modules/restaurant/adapters/outbound/inMemory/InMemoryRestaurantRepository"
import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter";

type Deps = {
    restaurantRepo: IRestaurantReader & IRestaurantWriter;
    menuItemRepo: IMenuItemReader & IMenuItemWriter;
};

export type CreateDeps = () => Deps;

export class TestSuitFactory {
    static createInMemory(): Deps {
        return {
            restaurantRepo: new InMemoryRestaurantRepository(),
            menuItemRepo: new InMemoryMenuItemRepository()
        }
    }

    static createPrisma(): Deps {
        return {
            restaurantRepo: new PrismaRestaurantRepository(),
            menuItemRepo: new PrismaMenuItemRepository()
        }
    }
}