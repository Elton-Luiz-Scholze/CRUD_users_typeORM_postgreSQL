import { Request, Response } from "express";
import { IUser, IUserRequest } from "../interfaces/users"
import { createUserService, listAllUserService } from "../services/userServices";

const createUserController = async (req: Request, res: Response<IUser>) => {
    const data: IUserRequest = req.body;
    const newUser = await createUserService(data);

    return res.status(201).json(newUser);
}

const listAllUsersController = async (req: Request, res: Response) => {
    const listUsers = await listAllUserService();

    return res.status(200).json(listUsers);
}

export { createUserController, listAllUsersController };