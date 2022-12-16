import { Request, Response } from "express";
import { IUser, IUserRequest } from "../interfaces/users"
import { createUserService, deleteUserService, listAllUserService, updatedUserService } from "../services/userServices";

const createUserController = async (req: Request, res: Response<IUser>) => {
    const data: IUserRequest = req.body;
    const newUser = await createUserService(data);

    return res.status(201).json(newUser);
}

const listAllUsersController = async (req: Request, res: Response) => {
    const listUsers = await listAllUserService();

    return res.status(200).json(listUsers);
}

const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userDelete = await deleteUserService(id);

    return res.status(204).json(userDelete);
}

const updatedUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const userDelete = await updatedUserService(userData, id);

    return res.status(200).json(userDelete);
}

export { createUserController, listAllUsersController, deleteUserController, updatedUserController };