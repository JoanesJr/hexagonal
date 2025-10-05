import { describe, it, expect } from "vitest";
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { DeleteRestaurantUseCase } from "../../deleteRestaurant.useCase";
import { mockDTO } from "./mockRestaurants";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { CreateDeps } from "./testSuit.factory";
import { mockMenuItensDTO } from "@/modules/menuItem/application/__tests__/shared/mockMenuItens";
import { CreateMenuItemUseCase } from "@/modules/menuItem/application/createMenuItem.useCase";
import { RestaurantHaveItemsError } from "@/shared/errors/RestaurantHaveItemsError";

export function runSharedTests(label: string, makeDeps: CreateDeps) {
    describe(`DeleteRestaurantUseCase - [${label}]`, () => {
        const makeUseCase = () => {
            const { restaurantRepo, menuItemsRepo } = makeDeps();
            return {
                createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo),
                createItem: new CreateMenuItemUseCase(menuItemsRepo, menuItemsRepo, restaurantRepo),
                sut: new DeleteRestaurantUseCase(restaurantRepo, restaurantRepo, menuItemsRepo)
            }
        }
        it ("should be deleted exists restaurant with empty items", async () => {
            const {createRestaurant , sut} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.first);
            const deleted = await sut.execute(restaurant1.id);
            expect(deleted.id).toBeDefined();
        })
        it ("should be not deleted not exists restaurant", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('dontExists')).rejects.toBeInstanceOf(NotFoundError);
        })
        it ("should be not deleted restaraunt that have items", async () => {
            const {sut, createRestaurant, createItem} = makeUseCase();
            const { id: restaurantId } = await createRestaurant.execute(mockDTO.second);
            const item = await createItem.execute({...mockMenuItensDTO.first, restaurantId});
            await expect(() => sut.execute(restaurantId)).rejects.toBeInstanceOf(RestaurantHaveItemsError);
        })
    })
}