import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

import { CreateUser } from "../services/accessService.js";

export function sanitizeSignUp(req: Request, res: Response, next: NextFunction) {
    const signUpUser: CreateUser = req.body;

    const user: CreateUser = {
        ...signUpUser,
        email: stripHtml(signUpUser.email).result,
        password: stripHtml(signUpUser.password).result,
        repeatedPassword: stripHtml(signUpUser.repeatedPassword).result
    }

    res.locals.data = user;

    next();
}