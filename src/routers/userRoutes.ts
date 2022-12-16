import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, updatedUserController } from "../controllers/userControllers";
import { verifyEmailExistsMiddleware, verifyKeysBodyMiddleware, verifyTokenMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware, verifyUserPermissionsMiddleware, verifyUserPermissionsUpdateMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createUserSchema, updatedUserSchema } from "../schemas/userSchemas";

const userRoutes = Router();

userRoutes.post("", validateDataMiddleware(createUserSchema), verifyEmailExistsMiddleware, createUserController);
userRoutes.get("", verifyTokenMiddleware, verifyUserPermissionsMiddleware, listAllUsersController);
userRoutes.delete("/:id", verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware, deleteUserController);
userRoutes.patch("/:id", verifyTokenMiddleware, verifyUserPermissionsUpdateMiddleware, verifyUserIdExistsMiddleware, verifyKeysBodyMiddleware, validateDataMiddleware(updatedUserSchema), updatedUserController);

export { userRoutes };