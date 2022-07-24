import { Router } from "express";

const access = Router();

access.post("/sign-up");
access.post("/sign-in");

export default access;