import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
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

const updatedUserService = async (userData: IUserUpdate,  id: string): Promise<IUserUpdate> => {
    const user = await userRepository.findOneBy({ id: id });
    
    const userUpdated = userRepository.create({ 
        ...user, 
        ...userData 
    });

    await userRepository.save(userUpdated);

    const returnedUserUpdate = await returnUserSchema.validate(userUpdated, {
        stripUnknown: true
    })

    return returnedUserUpdate;
}

export { createUserService, listAllUserService, deleteUserService, updatedUserService };