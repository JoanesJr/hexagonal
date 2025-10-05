import z from "zod";

export const CreateMenuItemSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    price: z.coerce.number(),
    restaurantId: z.string()
});

export const UpdateMenuItemSchema = CreateMenuItemSchema.partial();