import app from "./infra/http/server";
import { QueueMenuItemConsumerFactory } from "./modules/menuItem/adapters/inbound/queue/QueueConsumer.factory";
import { QueueRestaurantConsumerFactory } from "./modules/restaurant/adapters/inbound/queue/QueueConsumer.factory";
import { env } from "./shared/config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🔥 Server is running at http://localhost:${PORT}`);
});

QueueRestaurantConsumerFactory.start();
QueueMenuItemConsumerFactory.start();