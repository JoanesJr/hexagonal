import { CreateRestaurantDTO, UpdateRestaurantDTO } from "@/modules/restaurant/domain/dto";
import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter";
import { randomUUID } from "node:crypto";

export class InMemoryRestaurantRepository implements IRestaurantReader, IRestaurantWriter {
    private restaurants: Restaurant[] = [];
    async save(data: CreateRestaurantDTO): Promise<Restaurant> {
        const restaurant = new Restaurant(randomUUID(), data.name, data.address, data.isOpen);
        this.restaurants.push(restaurant);
        return restaurant;
    }
    async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
        let index = this.restaurants.findIndex(item => item.id == id);
        this.restaurants[index] = {...this.restaurants[index], ...data};
        return this.restaurants[index]!;
    }
    async delete(id: string): Promise<Restaurant> {
        const newRestaurants = this.restaurants.filter(item => item.id != id);
        const remvovedRestaurants = this.restaurants.find(item => item.id == id);
        this.restaurants = newRestaurants;
        return remvovedRestaurants;
    }
    async findById(id: string): Promise<Restaurant> {
        const restaurant = this.restaurants.find(item => item.id == id);
        return restaurant;
    }
    async findByAll(): Promise<Restaurant[]> {
        return this.restaurants;
    }

    async findByField(field: string, value: unknown): Promise<Restaurant[]> {
        const restaurants = this.restaurants.filter(item => item[field] == value);
        return restaurants;
    }
}