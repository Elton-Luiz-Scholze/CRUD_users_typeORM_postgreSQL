import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userRepository } from "../repository/userRepository";
import { AppError } from "../errors/errors"

const verifyEmailExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body;

    const findEmail = await userRepository.findOneBy({ email: email});

    if(findEmail) {
        throw new AppError(400, "Email already exists");
    }

    return next();
}

const verifyTokenMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    
    let authToken = req.headers.authorization;    
    
    if(!authToken) {
        throw new AppError(401, "Missing authorization headers");
    }
    
    authToken = authToken.split(" ")[1];
    
    return jwt.verify(authToken, process.env.SECRET_KEY, (error, decoded: any) => {
        if(error) {
            throw new AppError(401, "Missing authorization headers");
        }

        req.user = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }
        

        return next();
    });
}

const verifyUserPermissionsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { isAdm, id } = req.user;
    const { idParams } = req.params;

    if(!isAdm && id !== idParams) {
        throw new AppError(403, "Missing admin permissions");
    }

    return next();
}

const verifyUserPermissionsUpdateMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { isAdm, id } = req.user;
    const { idParams } = req.params;

    if(!isAdm && id !== idParams) {
        throw new AppError(401, "Missing admin permissions");
    }

    return next();
}

const verifyUserIdExistsMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
    const userId = await userRepository.findOneBy({ id: id });

    if(!userId) {
        throw new AppError(404, "Id not exists");
    }

    return next();
}

const verifyUserIsActivIsFalseMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
    const userId = await userRepository.findOneBy({ id: id });

    if(!userId.isActive) {
        throw new AppError(400, "User is inactive");
    }

    return next();
}

const verifyKeysBodyMiddleware = async (req : Request, res : Response, next : NextFunction) => {

    const keys = Object.keys(req.body);
    
        if(keys.includes("id") || keys.includes("isAdm") || keys.includes("isActive")){
            throw new AppError(401, "The id or isAdmin or isActive field cannot be updated");
        }
    
        return next();
}

export { verifyEmailExistsMiddleware, verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyUserPermissionsUpdateMiddleware, verifyUserIdExistsMiddleware, verifyUserIsActivIsFalseMiddleware, verifyKeysBodyMiddleware };