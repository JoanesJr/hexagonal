import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { CreateMenuItemDTO } from "../domain/dto";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { IMenuItemWriter } from "../ports/IMenuItemWriter";
import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";

export class CreateMenuItemUseCase {
    constructor(private readonly menuItemReader: IMenuItemReader, private readonly menuItemWriter: IMenuItemWriter, private readonly restaurantReader: IRestaurantReader) {}

    async execute(dto: CreateMenuItemDTO) {
        const existsSameName = await this.menuItemReader.findByFieldAndRestaurant('name', dto.name, dto.restaurantId);
        if (existsSameName) {
            throw new AlreadyExistsError(CreateMenuItemUseCase.name);
        }
        const existsRestaurant = await this.restaurantReader.findById(dto.restaurantId);
        if (!existsRestaurant) {
            throw new NotFoundError(CreateMenuItemUseCase.name, 'restaurant')
        }
        if (!existsRestaurant.isOpen) {
            throw new RestaurantIsClosedError(CreateMenuItemUseCase.name);
        }
        if (dto.price < 0) {
            throw new InvalidPriceError(CreateMenuItemUseCase.name);
        }

        const created = await this.menuItemWriter.save(dto);
        return created;
    }
}