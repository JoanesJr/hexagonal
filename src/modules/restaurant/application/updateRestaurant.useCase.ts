import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { UpdateRestaurantDTO } from "../domain/dto";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";
import { NotFoundError } from "@/shared/errors/NotFound.error";

export class UpdateRestaurantUseCase {
    constructor(
        private readonly restaurantReader: IRestaurantReader,
        private readonly restaurantWriter: IRestaurantWriter
    ) {}

    async execute(id: string, dto: UpdateRestaurantDTO) {
        const existsRestaurants = await this.restaurantReader.findByField('name', dto.name);
        if (existsRestaurants.length > 0 && id != existsRestaurants[0].id) {
            throw new AlreadyExistsError(UpdateRestaurantUseCase.name);
        }
        const existsRestaurant = await this.restaurantReader.findById(id);
        if (!existsRestaurant) {
            throw new NotFoundError(UpdateRestaurantUseCase.name);
        }

        const restaurant = await this.restaurantWriter.update(id, dto);
        return restaurant;
    }
}