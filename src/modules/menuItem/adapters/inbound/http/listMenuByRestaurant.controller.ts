import { Request, Response } from "express";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export async function listMenuByRestaurantController(req: Request, res: Response) {
    const { restaurantId } = req.params;
    if (!restaurantId) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: "restaurantId is missing" });
    }

    const { listMenuByRestaurant } = MenuItemUseCaseFactory.createUseCases();
    const created = await listMenuByRestaurant.execute(restaurantId);
    return res.status(201).json(created);

}
