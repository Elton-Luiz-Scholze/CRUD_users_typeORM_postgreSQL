import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import { IUserRequest } from "../interfaces/users";

const createUserService = async (UserData: IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const createUser= userRepository.create(UserData);

    await userRepository.save(createUser);

    return createUser;
}

export { createUserService };