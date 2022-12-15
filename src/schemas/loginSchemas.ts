import * as yup from "yup";
import { IUserLogin } from "../interfaces/users";

const loginSchema: yup.SchemaOf<IUserLogin> = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
});

export { loginSchema };