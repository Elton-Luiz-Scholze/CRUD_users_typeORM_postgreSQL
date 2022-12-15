import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import { IUser, IUserRequest } from "../interfaces/users";
import { returnNewUserSchema } from "../schemas/userSchemas";

const createUserService = async (UserData: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);
    const createUser= userRepository.create(UserData);

    await userRepository.save(createUser);

    const returnedNewUser = await returnNewUserSchema.validate(createUser, {
        stripUnknown: true
    });

    return returnedNewUser;
}

export { createUserService };