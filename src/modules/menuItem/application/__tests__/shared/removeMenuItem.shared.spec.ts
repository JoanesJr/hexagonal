import { describe, expect, it } from "vitest";
import { RemoveMenuItemUseCase } from "../../removeMenuItem.useCase";
import { CreateRestaurantUseCase } from "@/modules/restaurant/application/createRestaurant.useCase";
import { CreateMenuItemUseCase } from "../../createMenuItem.useCase";
import { mockDTO } from "@/modules/restaurant/application/__tests__/shared/mockRestaurants";
import { mockMenuItensDTO } from "./mockMenuItens";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IDepsFactory } from "./interfaces.shared";

export function runSharedTests(label: string, makeDeps: IDepsFactory) {
    const makeUseCase = () => {
        const { repo, restaurantRepo } = makeDeps();
        return {
            createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo),
            createMenuItem: new CreateMenuItemUseCase(repo, repo, restaurantRepo),
            sut: new RemoveMenuItemUseCase(repo, repo)
        }
    }
    describe(`RemoveMenuItemUseCase - [${label}]`, () => {
        it("should be deleted exists menuItem", async () => {
            const {createMenuItem, createRestaurant, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const item = await createMenuItem.execute({...mockMenuItensDTO.first, restaurantId: restaurant.id});
            const deletedItem = await sut.execute(item.id);
            expect(deletedItem.id).toBeDefined();
            expect(deletedItem.name).toBe(mockMenuItensDTO.first.name);
    
        })
        it("should be not deleted inexists menuItem", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('notFound')).rejects.toBeInstanceOf(NotFoundError)
        })
    });
}