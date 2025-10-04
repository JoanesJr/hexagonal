import { InMemoryMenuItemRepository } from "@/modules/menuItem/adapters/outbound/inMemory/InMemoryMenuItemRepository"
import { PrismaMenuItemRepository } from "@/modules/menuItem/adapters/outbound/prisma/PrismaMenuItem.repository"
import { InMemoryRestaurantRepository } from "@/modules/restaurant/adapters/outbound/inMemory/InMemoryRestaurantRepository"
import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository"

export const makeDepsPrisma = () => {
    return {
        restaurantRepo: new PrismaRestaurantRepository(),
        repo: new PrismaMenuItemRepository()
    }
}
export const makeDepsInMemory = () => {
    return {
        restaurantRepo: new InMemoryRestaurantRepository(),
        repo: new InMemoryMenuItemRepository()
    }
}