import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneByOrFail({email: email});
    
    const token = jwt.sign(
        { 
            isAdm: user.isAdm
        },
        process.env.SECRET_KEY!,
        { expiresIn: "24h", subject: user.id }
    );

    return token;
}

export { loginService };