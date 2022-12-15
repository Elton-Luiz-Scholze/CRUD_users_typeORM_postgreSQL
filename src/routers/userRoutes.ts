import { Router } from "express";
import { createUserController, listAllUsersController } from "../controllers/userControllers";
import { verifyEmailExistsMiddleware, verifyTokenMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("", validateDataMiddleware(createUserSchema), verifyEmailExistsMiddleware, createUserController);
userRoutes.get("", verifyTokenMiddleware, verifyUserPermissionsMiddleware, listAllUsersController);

export { userRoutes };