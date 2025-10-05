import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";

const app = express();
app.use(express.json());

app.use(router);
app.use(errorHandler);
// app.use("/menu-items", menuItemRoutes)

export default app;
