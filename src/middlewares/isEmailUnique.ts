import { Request, Response, NextFunction } from "express";

import accessRepository from "../repositories/accessRepository.js";

export async function isEmailUnique(req: Request, res: Response, next: NextFunction) {
    const { email }: { email: string } = res.locals.data;
    const user = await accessRepository.getUserByEmail(email);

    if(user) return res.status(409).send("This email is already being used");

    next();
}