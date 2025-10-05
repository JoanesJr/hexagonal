import { Request, Response } from "express";
import { RestaurantUseCaseFactory } from "@/modules/restaurant/factories/RestaurantUseCaseFactory";

export async function listRestaurantsController(req: Request, res: Response) {
    const onlyOpen = req?.params?.isOpen == "true";
    const { listRestaurants } = RestaurantUseCaseFactory.createUseCases();
    const restaurants = await listRestaurants.execute(onlyOpen);
    return res.status(201).json(restaurants);
}
