import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { CreateRestaurantDTO } from "../domain/dto";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";
import { Restaurant } from "../domain/restaurant";
import { randomUUID } from "node:crypto";

export class CreateRestaurantUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader,
        private readonly restaurantWriter: IRestaurantWriter
    ) {}

    async execute(data: CreateRestaurantDTO) {
        const existsName = await this.restaurantReader.findByField('name', data.name);
        if (existsName.length > 0) {
            throw new AlreadyExistsError(CreateRestaurantUseCase.name);
        }
        const restaurant = new Restaurant(randomUUID(), data.name, data.address, data.isOpen);
        const created = await this.restaurantWriter.save(restaurant);
        return created;
    }
}