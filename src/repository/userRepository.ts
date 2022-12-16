import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";

const userRepository = AppDataSource.getRepository(User);

export { userRepository };