import { describe, it, expect } from "vitest";
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { ListRestaurantsUseCase } from "../../listRestaursnts.useCase";
import { mockDTO } from "./mockRestaurants";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { CreateDeps } from "./testSuit.factory";

export function runSharedTests(label: string, makeDeps: CreateDeps) {
    const makeUseCase = () => {
        const { restaurantRepo } = makeDeps();
        const repo = restaurantRepo;
        return {
            createRestaurant: new CreateRestaurantUseCase(repo, repo),
            sut: new ListRestaurantsUseCase(repo)
        }
    }
    describe(`ListRestaurantsUseCase = [${label}]`, () => {
        it("Should be list all restaurants", async () => {
            const { createRestaurant, sut } = makeUseCase();
            await createRestaurant.execute(mockDTO.first);
            await createRestaurant.execute(mockDTO.second);
            const restaurants = await sut.execute(false);
            expect(restaurants).toHaveLength(2)
        })
    
        it ("Should be list only active restaurants", async () => {
            const { createRestaurant, sut } = makeUseCase();
            await createRestaurant.execute(mockDTO.first);
            await createRestaurant.execute(mockDTO.second);
            const restaurants = await sut.execute(true);
            expect(restaurants).toHaveLength(1);
        })
    
        it ("Should be return NotFoundError if restaurants is empty", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute()).rejects.toBeInstanceOf(NotFoundError);
        } )
    })
}