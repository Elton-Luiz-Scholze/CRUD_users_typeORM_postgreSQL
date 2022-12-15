import "express-async-errors";
import express from "express";
import { userRoutes } from "./routers/userRoutes";
import { loginRoute } from "./routers/loginRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoute);

export default app;