import { Router } from "express";
import { createRestaurantController } from "@/modules/restaurant/adapters/inbound/http/createRestaurant.controller";
import { listRestaurantsController } from "@/modules/restaurant/adapters/inbound/http/listRestaurants.controller";
import { updateRestaurantController } from "@/modules/restaurant/adapters/inbound/http/updateRestaurant.controller";
import { deleteRestaurantController } from "@/modules/restaurant/adapters/inbound/http/deleteRestaurants.controller";

const restaurantRoutes = Router();
restaurantRoutes.post("/", createRestaurantController);
restaurantRoutes.get("/", listRestaurantsController);
restaurantRoutes.get("/isOpen", (req, res, next) => {
    req.params = {
        ...req.params,
        isOpen: "true",
    };
    next()
},listRestaurantsController);
restaurantRoutes.patch("/:id", updateRestaurantController);
restaurantRoutes.delete("/:id", deleteRestaurantController);

export default restaurantRoutes;
