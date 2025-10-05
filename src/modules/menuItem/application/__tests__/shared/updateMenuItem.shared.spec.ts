import { describe, expect, it } from "vitest";
import { CreateRestaurantUseCase } from "@/modules/restaurant/application/createRestaurant.useCase";
import { CreateMenuItemUseCase } from "../../createMenuItem.useCase";
import { mockDTO } from "@/modules/restaurant/application/__tests__/shared/mockRestaurants";
import { UpdateMenuItemUseCase } from "../../updateMenuItem.useCase";
import { mockMenuItensDTO } from "./mockMenuItens";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { CreateDeps } from "./testSuit.factory";

export function runSharedTests(label: string, makeDeps: CreateDeps) {
    describe(`UpdateMenuItemUseCase - [${label}]`, () => {
        const makeUseCase = () => {
            const { menuItemRepo, restaurantRepo, logger } = makeDeps();
            return {
                createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo, logger),
                createMenuItem: new CreateMenuItemUseCase(menuItemRepo, menuItemRepo, restaurantRepo, logger),
                sut: new UpdateMenuItemUseCase(menuItemRepo, menuItemRepo, logger)
            }
        }
        it("should be update with success", async () => {
            const {createRestaurant, createMenuItem, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const item1 = await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId: restaurant.id});
            const itemUpdated = await sut.execute(item1.id, { name: mockMenuItensDTO.first.name });
            expect(itemUpdated.id).toBeDefined();
            expect(itemUpdated.name).toBe(mockMenuItensDTO.first.name)
        })
    
        it ("should be not update an restaurant inexists", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('randomID', mockMenuItensDTO.first)).rejects.toBeInstanceOf(NotFoundError);
        })
    
        it ("should be not update menuItem with same name in same restaurant", async () => {
            const {createRestaurant, createMenuItem, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const item1 = await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId: restaurant.id});
            const item2 = await createMenuItem.execute({...mockMenuItensDTO.second, restaurantId: restaurant.id});
            await expect(() => sut.execute(item2.id, { name: mockMenuItensDTO.first.name })).rejects.toBeInstanceOf(AlreadyExistsError);
        })
    
        it ("should be not update menuItem with price less than 0", async () => {
            const {createRestaurant, createMenuItem, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const item = await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId: restaurant.id});
            await expect(() => sut.execute(item.id, { price:-1 })).rejects.toBeInstanceOf(InvalidPriceError);
        })
    })
}