import { describe, it, expect } from "vitest";
import { UpdateRestaurantUseCase } from "../../updateRestaurant.useCase";
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { ListRestaurantsUseCase } from "../../listRestaursnts.useCase";
import { mockDTO } from "./mockRestaurants";
import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { CreateDeps } from "./testSuit.factory";

export function runSharedTests(label: string, makeDeps: CreateDeps) {
    describe(`UpdateRestaurantUseCase - [${label}]`, () => {
        const makeUseCase = () => {
            const { restaurantRepo, logger } = makeDeps();
            const repo = restaurantRepo;
            return {
                createRestaurant: new CreateRestaurantUseCase(repo, repo, logger),
                listRestaurant: new ListRestaurantsUseCase(repo, logger),
                sut: new UpdateRestaurantUseCase(repo, repo, logger)
            }
        }
        it("should be totally update exists restaurant", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.first);
            await createRestaurant.execute(mockDTO.second);
            const updated = await sut.execute(restaurant1.id, mockDTO.three);
            expect(updated.id).toBe(restaurant1.id);
            expect(updated.name).toBe(mockDTO.three.name)
            expect(updated.address).toBe(mockDTO.three.address);
            expect(updated.isOpen).toBe(mockDTO.three.isOpen);
        })
        it("should be parcial update exists restaurant", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.first);
            await createRestaurant.execute(mockDTO.second);
            const updated = await sut.execute(restaurant1.id, {
                name: mockDTO.three.name
            });
            expect(updated.id).toBe(restaurant1.id);
            expect(updated.name).toBe(mockDTO.three.name)
            expect(updated.address).toBe(mockDTO.first.address);
            expect(updated.isOpen).toBe(mockDTO.first.isOpen);
        })
    
        it ("should be not update restaurant with two same names", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.first);
            await createRestaurant.execute(mockDTO.second);
            await expect(() => sut.execute(restaurant1.id, {
                name: mockDTO.second.name
            })).rejects.toBeInstanceOf(AlreadyExistsError);
        })
        it ("should be not update with not exists restaurant", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute('asahjsaihsaisa', {
                name: mockDTO.first.name
            })).rejects.toBeInstanceOf(NotFoundError);
        })
    })
}