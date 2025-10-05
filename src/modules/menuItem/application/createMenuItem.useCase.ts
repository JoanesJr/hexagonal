import { AlreadyExistsError } from "@/shared/errors/AlreadyExists.error";
import { CreateMenuItemDTO } from "../domain/dto";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { IMenuItemWriter } from "../ports/IMenuItemWriter";
import { InvalidPriceError } from "@/shared/errors/InvalidPrice.error";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { NotFoundError } from "@/shared/errors/NotFound.error";
import { RestaurantIsClosedError } from "@/shared/errors/RestaurantIsClosedError";
import { MenuItem } from "../domain/menuItem";
import { randomUUID } from "node:crypto";
import { ILoggerService } from "@/infra/logger/loggerService";

export class CreateMenuItemUseCase {
    constructor(private readonly menuItemReader: IMenuItemReader, private readonly menuItemWriter: IMenuItemWriter, private readonly restaurantReader: IRestaurantReader, private readonly logger: ILoggerService) {}

    async execute(dto: CreateMenuItemDTO) {
        const existsSameName = await this.menuItemReader.findByFieldAndRestaurant('name', dto.name, dto.restaurantId);
        if (existsSameName) {
            this.logger.error(`${CreateMenuItemUseCase.name} - AlreadyExistsError`, {dto});
            throw new AlreadyExistsError(CreateMenuItemUseCase.name);
        }
        const existsRestaurant = await this.restaurantReader.findById(dto.restaurantId);
        if (!existsRestaurant) {
            this.logger.error(`${CreateMenuItemUseCase.name} - NotFoundError`, {dto});
            throw new NotFoundError(CreateMenuItemUseCase.name, 'restaurant')
        }
        if (!existsRestaurant.isOpen) {
            this.logger.error(`${CreateMenuItemUseCase.name} - RestaurantIsClosedError`, {dto});
            throw new RestaurantIsClosedError(CreateMenuItemUseCase.name);
        }
        if (dto.price < 0) {
            this.logger.error(`${CreateMenuItemUseCase.name} - InvalidPriceError`, {dto});
            throw new InvalidPriceError(CreateMenuItemUseCase.name);
        }

        const item = new MenuItem(randomUUID(), dto.name, dto.description, dto.price, dto.restaurantId);

        const created = await this.menuItemWriter.save(item);
        this.logger.info(`${CreateMenuItemUseCase.name} - success`, {dto, item});
        return created;
    }
}