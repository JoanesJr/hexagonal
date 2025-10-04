import { describe, expect, it } from 'vitest';
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { AlreadyExistsError } from '@/shared/errors/AlreadyExists.error';
import { mockDTO } from './mockRestaurants';
import { IDepsFactory } from './interfaces.shared';

export function runSharedTests(label: string, makeDeps: IDepsFactory) {
    describe(`CreateRestaurantUseCase - [${label}]`, () => {
        const makeUseCase = () => {
            const { restaurantRepo } = makeDeps();
            const repo = restaurantRepo
            const useCase = new CreateRestaurantUseCase(repo, repo);
            return useCase;
        }
        it("should be create restaurant", async () => {
            const sut = makeUseCase();
            const restaurant = await sut.execute(mockDTO.first);
    
            expect(restaurant.name).toBe(mockDTO.first.name);
            expect(restaurant.address).toBe(mockDTO.first.address);
            expect(restaurant.isOpen).toBe(mockDTO.first.isOpen);
            expect(restaurant.id).toBeDefined();
        })
    
        it ("should be not create two restaurants with same name", async () => {
            const sut = makeUseCase();
            await sut.execute(mockDTO.first);
            await expect( () => sut.execute(mockDTO.first)).rejects.toBeInstanceOf(AlreadyExistsError)
        })
    
        it ("should be create restaurants with different name", async () => {
            const sut = makeUseCase();
            const restaurant1 = await sut.execute(mockDTO.first);
            const restaurant2 = await sut.execute(mockDTO.second);
            const restaurant3 = await sut.execute(mockDTO.three);
            expect(restaurant1.id).toBeDefined();
            expect(restaurant2.id).toBeDefined();
            expect(restaurant3.id).toBeDefined();
        })
    })
}

