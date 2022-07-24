import { Router } from "express";
import validateToken from "../middlewares/validateToken";

const tests = Router();

tests.post("/tests",
    validateToken
);
tests.get("/tests/disciplines",
    validateToken
);
tests.get("/tests/teachers",
    validateToken
);

export default tests;