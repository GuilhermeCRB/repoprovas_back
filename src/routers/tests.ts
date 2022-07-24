import { Router } from "express";

const tests = Router();

tests.post("/tests");
tests.get("/tests/disciplines");
tests.get("/tests/teachers");

export default tests;