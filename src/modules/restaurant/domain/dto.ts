export type CreateRestaurantDTO = {
    name: string;
    address: string;
    isOpen: boolean;
};

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>;