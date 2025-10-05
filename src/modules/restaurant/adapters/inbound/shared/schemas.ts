import z from "zod";

export const CreateRestaurantSchema = z.object({
    name: z.string().min(3),
    address: z.string().min(6),
    isOpen: z.boolean().default(false)
});

export const UpdateRestaurantSchema = CreateRestaurantSchema.partial()