import { CreateMenuItemDTO, UpdateMenuItemDTO } from "@/modules/menuItem/domain/dto";
import { MenuItem } from "@/modules/menuItem/domain/menuItem";
import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { IMenuItemWriter } from "@/modules/menuItem/ports/IMenuItemWriter";
import { PrismaRepository } from "@/shared/base/PrismaRepository";

export class PrismaMenuItemRepository extends PrismaRepository implements IMenuItemReader, IMenuItemWriter {
    constructor() {
        super();
    }
    async save(data: CreateMenuItemDTO): Promise<MenuItem> {
        const created = await this.prisma.menuItem.create({data});
        return created;
    }
    async update(id: string, data: UpdateMenuItemDTO): Promise<MenuItem> {
        const updated = await this.prisma.menuItem.update({
            where: {id},
            data
        });
        return updated;
    }

    async delete(id: string): Promise<MenuItem> {
        const deleted = await this.prisma.menuItem.delete({
            where: {id}
        });
        return deleted;
    }

    async findById(id: string): Promise<MenuItem> {
        const menuItem = await this.prisma.menuItem.findUnique({
            where: {id}
        })
        return menuItem;
    }

    async findByAll(): Promise<MenuItem[]> {
        const menuItens = await this.prisma.menuItem.findAll();
        return menuItens;
    }

    async findAllByRestaurant(restaurantId: string) {
        const menuItens = await this.prisma.menuItem.findMany({
            where: {restaurantId}
        })

        return menuItens;
    }

    async findByField(field: string, value: unknown): Promise<MenuItem[]> {
        const menuItens = await this.prisma.menuItem.findMany({
            where: {[field]: value}
        });

        return menuItens;
    }

    async findByFieldAndRestaurant(field: string, value: unknown, restaurantId: string): Promise<MenuItem> {
        const menuItens = await this.prisma.menuItem.findFirst({
            where: {
                [field]: value,
                restaurantId
            }
        });

        return menuItens;
    }
}