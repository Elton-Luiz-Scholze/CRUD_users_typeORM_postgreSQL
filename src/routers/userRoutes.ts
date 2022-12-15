import { Router } from "express";
import { createUserController } from "../controllers/userControllers";
import { verifyEmailExistsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("", validateDataMiddleware(createUserSchema), verifyEmailExistsMiddleware, createUserController);

export { userRoutes };