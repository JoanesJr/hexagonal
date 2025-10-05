import { Request, Response } from "express";
import { CreateRestaurantSchema } from "./shared/schemas";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";

export async function createRestaurantController(req: Request, res: Response) {
    const body = CreateRestaurantSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: body.error?.format() });
    }

    const { createRestaurant } = RestaurantUseCaseFactory.createUseCases();
    const created = await createRestaurant.execute(body.data);
    return res.status(201).json(created);

}
