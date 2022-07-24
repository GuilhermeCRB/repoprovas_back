import Joi from "joi";

const signUpSchema = Joi.object<{email: string, password: string, repeatedPassword: string}>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    repeatedPassword: Joi.ref('password')
});

export default signUpSchema;