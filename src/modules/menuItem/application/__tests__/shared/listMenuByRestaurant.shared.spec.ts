import { describe, it, expect } from "vitest";
import { CreateRestaurantUseCase } from "@/modules/restaurant/application/createRestaurant.useCase";
import { CreateMenuItemUseCase } from "../../createMenuItem.useCase";
import { ListMenuByRestaurantUseCase } from "../../listMenuByRestaurant.useCase";
import { mockDTO } from "@/modules/restaurant/application/__tests__/shared/mockRestaurants";
import { mockMenuItensDTO } from "./mockMenuItens";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";
import { UpdateRestaurantUseCase } from "@/modules/restaurant/application/updateRestaurant.useCase";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { CreateDeps } from "./testSuit.factory";

export function runSharedTests(label: string, makeDeps: CreateDeps) {
    const makeUseCase = () => {
        const { menuItemRepo, restaurantRepo, logger } = makeDeps();
        return {
            createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo, logger),
            updateRestaurant: new UpdateRestaurantUseCase(restaurantRepo, restaurantRepo, logger),
            createMenuItem: new CreateMenuItemUseCase(menuItemRepo, menuItemRepo, restaurantRepo, logger),
            sut: new ListMenuByRestaurantUseCase(menuItemRepo, restaurantRepo, logger)
        }
    }
    describe(`ListMenuByRestaurantUseCase - [${label}]`, () => {
        it("should be list menu by restaurant", async () => {
            const {createRestaurant, createMenuItem, sut} = makeUseCase();
            const {id: restaurantId} = await createRestaurant.execute(mockDTO.second);
            const item1 = await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId});
            const item2 = await createMenuItem.execute({...mockMenuItensDTO.second, restaurantId});
            const menu = await sut.execute(restaurantId);
            expect(menu).toHaveLength(2);
            expect(menu[0].id).toBe(item1.id);
            expect(menu[1].id).toBe(item2.id);
        })
        it("should be not list menu by restaurant when is close", async () => {
            const {createRestaurant, createMenuItem, updateRestaurant ,sut} = makeUseCase();
            const {id: restaurantId} = await createRestaurant.execute(mockDTO.second);
            await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId});
            await createMenuItem.execute({...mockMenuItensDTO.second, restaurantId});
            const updated = await updateRestaurant.execute(restaurantId, { isOpen: false });
            expect(updated.id).toBeDefined();
            expect(updated.isOpen).toBe(false);
            await expect(() => sut.execute(restaurantId)).rejects.toBeInstanceOf(RestaurantIsClosedError);
        })
        it("should be not list menu by restaurant that not exists", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('idNotFound')).rejects.toBeInstanceOf(NotFoundError);
        })
    })
}