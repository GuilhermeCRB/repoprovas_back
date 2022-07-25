import { Router } from "express";

import { getTests, postTest } from "../controllers/testsController.js";
import { sanitizeTest } from "../middlewares/sanitizeTest.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import testSchema from "../schemas/testSchema.js";

const tests = Router();

tests.post("/tests",
    validateToken,
    sanitizeTest,
    validateSchema(testSchema),
    postTest
);
tests.get("/tests",
    validateToken,
    getTests
);

export default tests;