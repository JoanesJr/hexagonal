import { describe, it, expect } from "vitest";
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { DeleteRestaurantUseCase } from "../../deleteRestaurant.useCase";
import { mockDTO } from "./mockRestaurants";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IDepsFactory } from "./interfaces.shared";

export function runSharedTests(label: string, makeDeps: IDepsFactory) {
    describe(`DeleteRestaurantUseCase - [${label}]`, () => {
        const makeUseCase = () => {
            const { restaurantRepo } = makeDeps();
            const repo = restaurantRepo;
            return {
                createRestaurant: new CreateRestaurantUseCase(repo, repo),
                sut: new DeleteRestaurantUseCase(repo, repo)
            }
        }
        it ("should be deleted exists restaurant", async () => {
            const {createRestaurant , sut} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.first);
            const deleted = await sut.execute(restaurant1.id);
            expect(deleted.id).toBeDefined();
        })
        it ("should be deleted not exists restaurant", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('dontExists')).rejects.toBeInstanceOf(NotFoundError);
        })
    })
}