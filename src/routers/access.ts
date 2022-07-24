import { Router } from "express";

import { sanitizeSignUp } from "../middlewares/sanitizeSignUp.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const access = Router();

access.post("/sign-up", sanitizeSignUp, validateSchema(signUpSchema));
access.post("/sign-in");

export default access;