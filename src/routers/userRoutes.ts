import { Router } from "express";
import { createUserController } from "../controllers/userControllers";
import { verifyEmailExistsMiddleware } from "../middlewares/userMiddlewares";

const userRoutes = Router();

userRoutes.post("", verifyEmailExistsMiddleware, createUserController);

export { userRoutes };