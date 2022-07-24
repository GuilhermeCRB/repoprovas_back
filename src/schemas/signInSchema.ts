import Joi from "joi";

const signInSchema = Joi.object<{email: string, password: string, repeatedPassword: string}>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default signInSchema;