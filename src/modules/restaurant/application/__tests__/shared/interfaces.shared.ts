import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter";
export interface IDeps {
    restaurantRepo: IRestaurantReader & IRestaurantWriter;
}
export type IDepsFactory = () => IDeps;