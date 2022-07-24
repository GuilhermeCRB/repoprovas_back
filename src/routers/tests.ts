import { Router } from "express";

import { sanitizeTest } from "../middlewares/sanitizeTest";
import { validateSchema } from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import testSchema from "../schemas/testSchema";

const tests = Router();

tests.post("/tests",
    validateToken,
    sanitizeTest,
    validateSchema(testSchema)
);
tests.get("/tests/disciplines",
    validateToken
);
tests.get("/tests/teachers",
    validateToken
);

export default tests;