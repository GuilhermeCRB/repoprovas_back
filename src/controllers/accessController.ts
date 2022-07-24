import { Request, Response } from "express";

import accessService, { CreateUser } from "../services/accessService.js";

export async function signUp(req: Request, res: Response) {
    const user: CreateUser = res.locals.data;
    await accessService.signUpUser(user);
    res.sendStatus(201);
}