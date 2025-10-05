import { Request, Response } from "express";
import { UpdateRestaurantSchema } from "./shared/schemas";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";

export async function deleteRestaurantController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: "Missing Id" });
    }

    const { deleteRestaurant } = RestaurantUseCaseFactory.createUseCases();
    const created = await deleteRestaurant.execute(id);
    return res.status(201).json(created);

}
