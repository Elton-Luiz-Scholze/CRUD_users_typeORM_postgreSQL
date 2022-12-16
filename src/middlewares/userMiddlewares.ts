import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userRepository } from "../repository/userRepository";
import { AppError } from "../errors/errors";

const verifyEmailExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body;

    const findEmail = await userRepository.findOneBy({ email: email});

    if(findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    return next();
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

const verifyUserIdExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
    const userId = await userRepository.findOneBy({ id: id });

    if(!userId) {
        // throw new AppError(404, "Id not exists");
        res.status(404).json({ message: "Id not exists" });
    }

    return next();
}

const verifyUserIsActivIsFalseMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
    const userId = await userRepository.findOneBy({ id: id });

    if(!userId.isActive) {
        // throw new AppError(404, "Id not exists");
        res.status(400).json({ message: "User is inactive" });
    }

    return next();
}

export { verifyEmailExistsMiddleware, verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware };