import { CreateMenuItemConsumer } from "./createMenuItem.consumer";
import { DeleteMenuItemConsumer } from "./deleteMenuItem.consumer";
import { UpdateMenuItemConsumer } from "./updateMenuItem.consumer";

export class QueueMenuItemConsumerFactory {
    static start() {
        const consumers = [
            new CreateMenuItemConsumer(),
            new UpdateMenuItemConsumer(),
            new DeleteMenuItemConsumer()
        ]
        for (let consumer of consumers) {
            consumer.start()
        }
    }
}