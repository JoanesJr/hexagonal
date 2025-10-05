import { Request, Response } from "express";
import { UpdateRestaurantSchema } from "../shared/schemas";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";

export async function updateRestaurantController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: "Missing Id" });
    }
    const body = UpdateRestaurantSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: body.error?.format() });
    }

    const { updateRestaurant } = RestaurantUseCaseFactory.createUseCases();
    const created = await updateRestaurant.execute(id, body.data);
    return res.status(201).json(created);

}
