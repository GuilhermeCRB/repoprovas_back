import Joi from "joi";

import { CreateUser } from "../services/accessService";

const signUpSchema = Joi.object<CreateUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatedPassword: Joi.ref('password')
});

export default signUpSchema;