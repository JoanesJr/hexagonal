import { Request, Response } from "express";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export async function deleteMenuItemController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: "id is missing" });
    }
    const { removeMenuitem } = MenuItemUseCaseFactory.createUseCases();
    const created = await removeMenuitem.execute(id);
    return res.status(201).json(created);

}
