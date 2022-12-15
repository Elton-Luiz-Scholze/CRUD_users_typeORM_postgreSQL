import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";

const verifyEmailExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const findEmail = await userRepository.findOneBy({ email: email});

    if(findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    next();

}

export { verifyEmailExistsMiddleware };