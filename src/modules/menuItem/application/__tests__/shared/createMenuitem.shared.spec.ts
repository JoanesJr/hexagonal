import { describe, it, expect } from "vitest";
import { CreateMenuItemUseCase } from "../../createMenuItem.useCase";
import { mockMenuItensDTO } from "./mockMenuItens";
import { CreateRestaurantUseCase } from "@/modules/restaurant/application/createRestaurant.useCase";
import { mockDTO } from "@/modules/restaurant/application/__tests__/shared/mockRestaurants";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";
import { MissingFieldError } from "@/shared/errors/MissingField.error";
import { MinLengthError } from "@/shared/errors/MinLengh.error";
import { CreateDeps } from "./testSuit.factory";


export function runSharedTests(label: string, makeDeps: CreateDeps) {
    const makeUseCase = () => {
        const { menuItemRepo, restaurantRepo } = makeDeps();
        return {
            createRestaurant: new CreateRestaurantUseCase(restaurantRepo, restaurantRepo),
            sut: new CreateMenuItemUseCase(menuItemRepo, menuItemRepo, restaurantRepo)
        }
    }
    describe(`CreateMenuItemUseCase - [${label}]`, () => {
        it("should be create menuItem in exists restaurant", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const created = await sut.execute({restaurantId: restaurant.id, ...mockMenuItensDTO.second});
            expect(created.id).toBeDefined();
            expect(created.name).toBe(mockMenuItensDTO.second.name);
            expect(created.description).toBe(mockMenuItensDTO.second.description);
            expect(created.price).toBe(mockMenuItensDTO.second.price);
        })
    
        it ("should be not create menuItem in inexists restaurant", async () => {
            const {sut} = makeUseCase();
            await expect(() => sut.execute({restaurantId: 'notFound', ...mockMenuItensDTO.second})).rejects.toBeInstanceOf(NotFoundError);
        })
    
        it ("should be not create menuItem with sameName in same Restaurant", async () => {
            const {sut, createRestaurant} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            const itemDTO = {...mockMenuItensDTO.first, restaurantId: restaurant.id};
            const item1 = await sut.execute(itemDTO);
            expect(item1.id).toBeDefined()
            await expect(() => sut.execute(itemDTO)).rejects.toBeInstanceOf(AlreadyExistsError);
        })
        it ("should be create menuItem with sameName in different Restaurant", async () => {
            const {sut, createRestaurant} = makeUseCase();
            const restaurant1 = await createRestaurant.execute(mockDTO.second);
            const restaurant2 = await createRestaurant.execute(mockDTO.three);
            const itemDTO = {...mockMenuItensDTO.first, restaurantId: restaurant1.id};
            const itemDTO2 = {...mockMenuItensDTO.first, restaurantId: restaurant2.id};
            const item1 = await sut.execute(itemDTO);
            const item2 = await sut.execute(itemDTO2);
            expect(item1.id).toBeDefined()
            expect(item2.id).toBeDefined();
        })
    
        it ("should be not create menuItem with negative price", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.second);
            await expect(() => sut.execute({...mockMenuItensDTO.three, restaurantId: restaurant.id})).rejects.toBeInstanceOf(InvalidPriceError);
        })
    
        it ("should be not create menuiten in close restaurant", async () => {
            const {createRestaurant, sut} = makeUseCase();
            const restaurant = await createRestaurant.execute(mockDTO.first);
            await expect(() => sut.execute({...mockMenuItensDTO.three, restaurantId: restaurant.id})).rejects.toBeInstanceOf(RestaurantIsClosedError);
        })

        it ("should be not create MenuItem without name or name min lengh 3", async () => {
            const {sut, createRestaurant} = makeUseCase();
            const { id: restaurantId } = await createRestaurant.execute(mockDTO.second);
            await expect(() => sut.execute({name: '', description: mockMenuItensDTO.first.description, price: mockMenuItensDTO.first.price, restaurantId})).rejects.toBeInstanceOf(MissingFieldError);
            await expect(() => sut.execute({name: 'aa', description: mockMenuItensDTO.first.description, price: mockMenuItensDTO.first.price, restaurantId})).rejects.toBeInstanceOf(MinLengthError);
        })

        it ("should be not create MenuItem without description or description min lengh 3", async () => {
            const {sut, createRestaurant} = makeUseCase();
            const { id: restaurantId } = await createRestaurant.execute(mockDTO.second);
            await expect(() => sut.execute({name:  mockMenuItensDTO.first.name, description: '', price: mockMenuItensDTO.first.price, restaurantId})).rejects.toBeInstanceOf(MissingFieldError);
            await expect(() => sut.execute({name:  mockMenuItensDTO.first.name, description: 'aa', price: mockMenuItensDTO.first.price, restaurantId})).rejects.toBeInstanceOf(MinLengthError);
        })

        it ("should be not create MenuItem with price less than 0", async () => {
            const {sut, createRestaurant} = makeUseCase();
            const { id: restaurantId } = await createRestaurant.execute(mockDTO.second);
            await expect(() => sut.execute({name:  mockMenuItensDTO.first.name, description: mockMenuItensDTO.first.description, price: -1, restaurantId})).rejects.toBeInstanceOf(InvalidPriceError);
        })
    })
} 