import { describe, expect, it } from 'vitest';
import { CreateRestaurantUseCase } from "../../createRestaurant.useCase";
import { AlreadyExistsError } from '@/shared/errors/AlreadyExists.error';
import { mockDTO } from './mockRestaurants';
import { IDepsFactory } from './interfaces.shared';
import { MinLengthError } from '@/shared/errors/MinLengh.error';
import { MissingFieldError } from '@/shared/errors/MissingField.error';

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

        it ("should be not create restaurant without name or name min lengh 3", async () => {
            const sut = makeUseCase();
            await expect(() => sut.execute({name: '', address: 'random', isOpen: false})).rejects.toBeInstanceOf(MissingFieldError);
            await expect(() => sut.execute({name: 'aa', address: 'random', isOpen: false})).rejects.toBeInstanceOf(MinLengthError);
        })

        it ("should be not create restaurant without address or address min lengh 3", async () => {
            const sut = makeUseCase();
            await expect(() => sut.execute({name: mockDTO.first.name, address: '', isOpen: false})).rejects.toBeInstanceOf(MissingFieldError);
            await expect(() => sut.execute({name: mockDTO.first.name, address: 'aa', isOpen: false})).rejects.toBeInstanceOf(MinLengthError);
        })

        it ("should be create restaurant close where don`t received isOpen field", async () => {
            const sut = makeUseCase();
            const restaurant1 = await sut.execute({name: mockDTO.first.name, address: mockDTO.first.address, isOpen: null});
            const restaurant2 = await sut.execute({name: mockDTO.second.name, address: mockDTO.second.address, isOpen: undefined});
            expect(restaurant1.id).toBeDefined();
            expect(restaurant1.isOpen).toBe(false);
            expect(restaurant2.id).toBeDefined();
            expect(restaurant2.isOpen).toBe(false);
        })
    })
}

