import { Router } from "express";
import { createMenuItemController } from "@/modules/menuItem/adapters/inbound/http/createMenuItem.controller";
import { listMenuByRestaurantController } from "@/modules/menuItem/adapters/inbound/http/listMenuByRestaurant.controller";
import { updateMenuItemController } from "@/modules/menuItem/adapters/inbound/http/updateMenuItem.controller";
import { deleteMenuItemController } from "@/modules/menuItem/adapters/inbound/http/deleteMenuitem.controller";

const menuItemsRoutes = Router();
menuItemsRoutes.post("/", createMenuItemController);
menuItemsRoutes.get("/:restaurantId", listMenuByRestaurantController);
menuItemsRoutes.patch("/:id", updateMenuItemController);
menuItemsRoutes.delete("/:id", deleteMenuItemController);

export default menuItemsRoutes;
