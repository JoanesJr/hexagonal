import { CreateRestauranteConsumer } from "./createRestaurant.consumer";
import { DeleteRestauranteConsumer } from "./deleteRestaurant.consumer";
import { UpdateRestauranteConsumer } from "./updateRestaurant.consumer";

export class QueueRestaurantConsumerFactory {
    static start() {
        const consumers = [
            new CreateRestauranteConsumer(),
            new UpdateRestauranteConsumer(),
            new DeleteRestauranteConsumer()
        ]
        for (let consumer of consumers) {
            consumer.start()
        }
    }
}