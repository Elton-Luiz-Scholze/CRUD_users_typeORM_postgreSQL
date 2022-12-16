import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import { loginService } from "../services/loginService";

const loginController = async (req: Request, res: Response) => {
    const { email }: IUserLogin = req.body;
    const token = await loginService(email);

    return res.status(200).json({token});
}

export { loginController };