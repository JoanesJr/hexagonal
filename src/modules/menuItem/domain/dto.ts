export type CreateMenuItemDTO = {
    name: string;
    description: string;
    price: number;
    restaurantId: string;
}

export type UpdateMenuItemDTO = Partial<CreateMenuItemDTO>;