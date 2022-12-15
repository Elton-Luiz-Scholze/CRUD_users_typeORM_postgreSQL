import { Request, Response } from "express";
import { IUser, IUserRequest } from "../interfaces/users"
import { createUserService } from "../services/userServices";

const createUserController = async (req: Request, res: Response<IUser>) => {
    const data: IUserRequest = req.body;
    const newUser = await createUserService(data);
    const { password, ...user } = newUser;

    return res.status(201).json(user);
}

export { createUserController };