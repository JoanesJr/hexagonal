import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { CreateRestaurantDTO } from "../domain/dto";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";

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
        const created = await this.restaurantWriter.save(data);
        return created;
    }
}