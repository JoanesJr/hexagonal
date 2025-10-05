import { Router } from "express";
import restaurantRoutes from "./restaurant.routes";
import menuItemsRoutes from "./menuItem.routes";

const router = Router();

router.use("/restaurants", restaurantRoutes);
router.use("/menuItems", menuItemsRoutes);

export default router;
