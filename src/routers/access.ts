import { Router } from "express";

import { signIn, signUp } from "../controllers/accessController.js";
import { isEmailUnique } from "../middlewares/isEmailUnique.js";
import { sanitizeSignIn } from "../middlewares/sanitizeSignIn.js";
import { sanitizeSignUp } from "../middlewares/sanitizeSignUp.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const access = Router();

access.post("/sign-up",
    sanitizeSignUp,
    validateSchema(signUpSchema),
    isEmailUnique,
    signUp
);

access.post("/sign-in",
    sanitizeSignIn,
    validateSchema(signInSchema),
    signIn
);

export default access;