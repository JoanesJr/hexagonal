import z from "zod";

export const CreateRestaurantSchema = z.object({
    name: z.string().min(3),
    address: z.string().min(6),
    isOpen: z.boolean().default(false)
});

export type CreateRestaurantDTO = z.infer<typeof CreateRestaurantSchema>;

export const UpdateRestaurantSchema = CreateRestaurantSchema.partial()

export type UpdateRestaurantDTO = z.infer<typeof UpdateRestaurantSchema>;