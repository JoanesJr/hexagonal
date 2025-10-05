import app from "./infra/http/server";
import { env } from "./shared/config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🔥 Server is running at http://localhost:${PORT}`);
});