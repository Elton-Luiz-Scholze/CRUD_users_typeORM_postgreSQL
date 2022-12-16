import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import { compare } from "bcryptjs";
import { IUserLogin } from "../interfaces/users";
import "dotenv/config";

const loginMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { email, password }: IUserLogin = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({email: email});
    
    if(!user) {
        return res.status(403).json({ message: "Wrong email or password" });
    }
    
    const passwordCompare = await compare(password, user.password);

    if(!passwordCompare) {
        return res.status(403).json({ message: "Wrong email or password" });
    }
    
    next();
}

export { loginMiddleware };