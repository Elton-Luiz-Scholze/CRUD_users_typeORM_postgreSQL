import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyEmailExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const findEmail = await userRepository.findOneBy({ email: email});

    if(findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    next();
}

const verifyTokenMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    
    let authToken = req.headers.authorization;    
    
    if(!authToken) {
        return res.status(401).json({message: "Missing authorization headers"});
    }
    
    authToken = authToken.split(" ")[1];
    
    return jwt.verify(authToken, process.env.SECRET_KEY, (error, decoded: any) => {
        if(error) {
            return res.status(401).json({message: "Missing authorization headers"});
        }

        req.user = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }
        

        return next();
    });
}

const verifyUserPermissionsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { isAdm } = req.user;

    if(!isAdm) {
        return res.status(403).json({message: "Missing admin permissions"});
    }
    return next();
}

export { verifyEmailExistsMiddleware, verifyTokenMiddleware, verifyUserPermissionsMiddleware };