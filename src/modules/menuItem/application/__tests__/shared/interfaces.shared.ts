import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { IMenuItemWriter } from "@/modules/menuItem/ports/IMenuItemWriter";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter";

interface IDeps {
    repo: IMenuItemReader & IMenuItemWriter,
    restaurantRepo: IRestaurantReader & IRestaurantWriter,
}

export type IDepsFactory = () => IDeps;