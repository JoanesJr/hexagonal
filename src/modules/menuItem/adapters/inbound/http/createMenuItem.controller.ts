import { Request, Response } from "express";
import { CreateMenuItemSchema } from "./shared/schemas";
import { MenuItemUseCaseFactory } from "@/modules/menuItem/factories/MenuItemUseCase.factory";

export async function createMenuItemController(req: Request, res: Response) {
    const body = CreateMenuItemSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: "error", message: "Invalid request body", details: body.error?.format() });
    }

    const { createMenuItem } = MenuItemUseCaseFactory.createUseCases();
    const created = await createMenuItem.execute(body.data);
    return res.status(201).json(created);

}
