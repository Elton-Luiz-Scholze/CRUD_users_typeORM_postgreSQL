import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import { IUser, IUserRequest } from "../interfaces/users";
import { listUsersSchema, returnUserSchema } from "../schemas/userSchemas";

const createUserService = async (UserData: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);
    const createUser= userRepository.create(UserData);

    await userRepository.save(createUser);

    const returnedNewUser = await returnUserSchema.validate(createUser, {
        stripUnknown: true
    });

    return returnedNewUser;
}

const listAllUserService = async ()  => {
    const userRepository = AppDataSource.getRepository(User);
    const listUsers = await userRepository.find();

    const returnedAllUser = await listUsersSchema.validate(listUsers, {
        stripUnknown: true
    });

    return returnedAllUser;
}

export { createUserService, listAllUserService };