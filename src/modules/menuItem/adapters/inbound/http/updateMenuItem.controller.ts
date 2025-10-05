import { Request, Response } from "express";
import { CreateMenuItemSchema, UpdateMenuItemSchema } from "../shared/schemas";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export async function updateMenuItemController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: "id is missing" });
    }
    const body = UpdateMenuItemSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: body.error?.format() });
    }

    const { updateMenuItem } = MenuItemUseCaseFactory.createUseCases();
    const created = await updateMenuItem.execute(id, body.data);
    return res.status(201).json(created);

}
