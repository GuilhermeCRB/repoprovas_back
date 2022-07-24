import { Router } from "express";

import { signUp } from "../controllers/accessController.js";
import { isEmailUnique } from "../middlewares/isEmailUnique.js";
import { sanitizeSignUp } from "../middlewares/sanitizeSignUp.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const access = Router();

access.post("/sign-up",
    sanitizeSignUp,
    validateSchema(signUpSchema),
    isEmailUnique,
    signUp
);

access.post("/sign-in");

export default access;