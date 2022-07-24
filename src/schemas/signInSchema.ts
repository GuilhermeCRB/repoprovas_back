import Joi from "joi";

import { CreateUser } from "../services/accessService";

const signInSchema = Joi.object<CreateUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default signInSchema;