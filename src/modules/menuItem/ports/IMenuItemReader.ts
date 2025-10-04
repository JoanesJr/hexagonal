import { IReader } from "@/shared/base/IReader";
import { MenuItem } from "../domain/menuItem";

export interface IMenuItemReader extends IReader<MenuItem> {
    findByFieldAndRestaurant(field: string, value: unknown, restaurantId: string): Promise<MenuItem>;
    findAllByRestaurant(restaurantId: string): Promise<MenuItem[]>;
};