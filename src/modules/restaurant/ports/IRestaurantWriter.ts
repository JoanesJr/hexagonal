import {IWriter} from "@/shared/base/IWriter";
import {UpdateRestaurantDTO, CreateRestaurantDTO} from "@/modules/restaurant/domain/dto";
import { Restaurant } from "../domain/restaurant";

export interface IRestaurantWriter extends IWriter<CreateRestaurantDTO, UpdateRestaurantDTO, Restaurant> {};