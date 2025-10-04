import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { UpdateMenuItemDTO } from "../domain/dto";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { IMenuItemWriter } from "../ports/IMenuItemWriter";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { MenuItem } from "../domain/menuItem";

export class UpdateMenuItemUseCase {
    constructor(private readonly itemReader: IMenuItemReader, private readonly itemWriter: IMenuItemWriter) {}

    async execute(id: string, dto: UpdateMenuItemDTO) {
        const existsItem = await this.itemReader.findById(id);
        if (!existsItem) {
            throw new NotFoundError(UpdateMenuItemUseCase.name);
        }
        const existsSameNameWithSameRestaurant = await this.itemReader.findByFieldAndRestaurant('name', dto.name, existsItem.restaurantId);
        if (existsSameNameWithSameRestaurant && existsSameNameWithSameRestaurant.id != id) {
            throw new AlreadyExistsError(UpdateMenuItemUseCase.name);
        }

        if (dto?.price && dto?.price < 0) {
            throw new InvalidPriceError(UpdateMenuItemUseCase.name);
        }
        const mergedData = Object.assign({}, existsItem, dto);
        const item = new MenuItem(mergedData.id, mergedData.name, mergedData.description, mergedData.price, mergedData.restaurantId);

        const updated = this.itemWriter.update(id, item);
        return updated;
    }
}