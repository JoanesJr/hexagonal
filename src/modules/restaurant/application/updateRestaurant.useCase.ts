import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { UpdateRestaurantDTO } from "../domain/dto";
import { IRestaurantReader } from "../ports/IRestaurantReader";
import { IRestaurantWriter } from "../ports/IRestaurantWriter";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { Restaurant } from "../domain/restaurant";

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
        const mergedData = Object.assign({}, existsRestaurant, dto);
        const restaurant = new Restaurant(mergedData.id, mergedData.name, mergedData.address, mergedData.isOpen);

        const updated = await this.restaurantWriter.update(id, restaurant);
        return updated;
    }
}