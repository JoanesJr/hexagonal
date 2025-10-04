import { CreateRestaurantDTO, UpdateRestaurantDTO } from "@/modules/restaurant/domain/dto";
import { Restaurant } from "@/modules/restaurant/domain/restaurant";
import { IRestaurantReader } from "@/modules/restaurant/ports/IRestaurantReader";
import { IRestaurantWriter } from "@/modules/restaurant/ports/IRestaurantWriter";
import { PrismaRepository } from "@/shared/base/PrismaRepository";

export class PrismaRestaurantRepository extends PrismaRepository implements IRestaurantReader, IRestaurantWriter {
    constructor () {
        super();
    }
    async save(data: CreateRestaurantDTO): Promise<Restaurant> {
        const created = await this.prisma.restaurant.create({data});
        return created;
    }
    async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
        const updated = await this.prisma.restaurant.update({
            where: {id},
            data
        });
        return updated;
    }

    async delete(id: string): Promise<Restaurant> {
        const deleted = await this.prisma.restaurant.delete({
            where: {id}
        });
        return deleted;
    }

    async findById(id: string): Promise<Restaurant> {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: {id}
        })
        return restaurant;
    }

    async findByAll(): Promise<Restaurant[]> {
        const restaurants = await this.prisma.restaurant.findAll();
        return restaurants;
    }

    async findByField(field: string, value: unknown): Promise<Restaurant[]> {
        const restaurants = await this.prisma.restaurant.findMany({
            where: {[field]: value}
        });

        return restaurants;
    }
}