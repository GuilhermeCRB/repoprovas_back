import Joi from "joi";

const signUpSchema = Joi.object<{email: string, password: string, repeatedPassword: string}>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatedPassword: Joi.ref('password')
});

export default signUpSchema;