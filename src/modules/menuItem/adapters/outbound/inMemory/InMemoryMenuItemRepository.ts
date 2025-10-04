import { CreateMenuItemDTO, UpdateMenuItemDTO } from "@/modules/menuItem/domain/dto";
import { MenuItem } from "@/modules/menuItem/domain/menuItem";
import { IMenuItemReader } from "@/modules/menuItem/ports/IMenuItemReader";
import { IMenuItemWriter } from "@/modules/menuItem/ports/IMenuItemWriter";
import { randomUUID } from "node:crypto";

export class InMemoryMenuItemRepository implements IMenuItemReader, IMenuItemWriter {
    private menuItems: MenuItem[] = [];
    async save(data: CreateMenuItemDTO): Promise<MenuItem> {
        const menuItem = new MenuItem(randomUUID(), data.name, data.description, data.price, data.restaurantId);
        this.menuItems.push(menuItem);
        return menuItem;
    }
    async update(id: string, data: UpdateMenuItemDTO): Promise<MenuItem> {
        let index = this.menuItems.findIndex(item => item.id == id);
        this.menuItems[index] = {...this.menuItems[index], ...data};
        return this.menuItems[index]!;
    }
    async delete(id: string): Promise<MenuItem> {
        const newMenuItens = this.menuItems.filter(item => item.id != id);
        const removedMenuItens = this.menuItems.find(item => item.id == id);
        this.menuItems = newMenuItens;
        return removedMenuItens;
    }
    async findById(id: string): Promise<MenuItem> {
        const restaurant = this.menuItems.find(item => item.id == id);
        return restaurant;
    }
    async findByAll(): Promise<MenuItem[]> {
        return this.menuItems;
    }
    async findAllByRestaurant(restaurantId: string): Promise<MenuItem[]> {
        return this.menuItems.filter(item => item.restaurantId == restaurantId);
    }

    async findByField(field: string, value: unknown): Promise<MenuItem[]> {
        const restaurants = this.menuItems.filter(item => item[field] == value);
        return restaurants;
    }

    async findByFieldAndRestaurant(field: string, value: unknown, restaurantId: string): Promise<MenuItem> {
        const menuItem = this.menuItems.filter(item => item.restaurantId == restaurantId && item[field] == value)[0];

        return menuItem;
    }
}