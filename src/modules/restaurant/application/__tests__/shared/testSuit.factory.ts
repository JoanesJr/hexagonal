import { InMemoryRestaurantRepository } from "@/modules/restaurant/adapters/outbound/inMemory/InMemoryRestaurantRepository"
import { PrismaRestaurantRepository } from "@/modules/restaurant/adapters/outbound/prisma/PrismaRestaurant.repository"
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader"
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter"

interface IDeps {
    restaurantRepo: IRestaurantReader & IRestaurantWriter;
}

export type CreateDeps = () => IDeps;
export class TestSuitFactory {
    static createInMemory(): IDeps {
        return {
            restaurantRepo: new InMemoryRestaurantRepository()
        }
    }
    static createPrisma(): IDeps {
        return {
            restaurantRepo: new PrismaRestaurantRepository()
        }
    }
}