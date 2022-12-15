import { Request, Response } from "express";
import { IUser, IUserRequest } from "../interfaces/users"
import { createUserService } from "../services/userServices";

const createUserController = async (req: Request, res: Response<IUser>) => {
    const data: IUserRequest = req.body;
    const newUser = await createUserService(data);

    return res.status(201).json(newUser);
}

export { createUserController };