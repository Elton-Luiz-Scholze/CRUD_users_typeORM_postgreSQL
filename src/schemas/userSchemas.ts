import * as yup from "yup";
import { IUser, IUserRequest } from "../interfaces/users";

const createUserSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().max(200).required(),
	email: yup.string().email().max(200).required(),
	password: yup.string().max(120).required(),
	isAdm: yup.boolean().required()
});

const returnNewUserSchema = yup.object().shape({
    id: yup.string().uuid(),
    name: yup.string().max(200),
	email: yup.string().email().max(200),
	isAdm: yup.boolean(),
    createdAt: yup.date(),
    updatedAt: yup.date()
});

export { createUserSchema, returnNewUserSchema };