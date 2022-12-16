import { IUser, IUserRequest } from "../interfaces/users";
import { userRepository } from "../repository/userRepository";
import { listUsersSchema, returnUserSchema } from "../schemas/userSchemas";

const createUserService = async (UserData: IUserRequest): Promise<IUser> => {
    const createUser= userRepository.create(UserData);

    await userRepository.save(createUser);

    const returnedNewUser = await returnUserSchema.validate(createUser, {
        stripUnknown: true
    });

    return returnedNewUser;
}

const listAllUserService = async ()  => {
    const listUsers = await userRepository.find();

    const returnedAllUser = await listUsersSchema.validate(listUsers, {
        stripUnknown: true
    });

    return returnedAllUser;
}

const deleteUserService = async (id: string) => {
    await userRepository.save({id: id, isActive: false});

    return {};
}

export { createUserService, listAllUserService, deleteUserService };