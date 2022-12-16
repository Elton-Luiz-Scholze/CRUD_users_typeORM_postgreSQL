import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController } from "../controllers/userControllers";
import { verifyEmailExistsMiddleware, verifyTokenMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("", validateDataMiddleware(createUserSchema), verifyEmailExistsMiddleware, createUserController);
userRoutes.get("", verifyTokenMiddleware, verifyUserPermissionsMiddleware, listAllUsersController);
userRoutes.delete("/:id", verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware, deleteUserController);

export { userRoutes };