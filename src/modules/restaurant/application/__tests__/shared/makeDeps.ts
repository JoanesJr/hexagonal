import { InMemoryRestaurantRepository } from "@/modules/restaurant/adapters/outbound/inMemory/InMemoryRestaurantRepository"
import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository"

export const makeDepsPrisma = () => {
    return {
        restaurantRepo: new PrismaRestaurantRepository()
    }
}
export const makeDepsInMemory = () => {
    return {
        restaurantRepo: new InMemoryRestaurantRepository()
    }
}