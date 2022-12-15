import * as yup from "yup";
import { IUser, IUserRequest } from "../interfaces/users";

const createUserSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().max(200).required(),
	email: yup.string().email().max(200).required(),
	password: yup.string().max(120).required(),
	isAdm: yup.boolean().required()
});

const returnNewUserSchema: yup.SchemaOf<IUser> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
	email: yup.string().email(),
	isAdm: yup.boolean(),
    isActive: yup.boolean(),
    createdAt: yup.date(),
    updatedAt: yup.date()
});

export { createUserSchema, returnNewUserSchema };