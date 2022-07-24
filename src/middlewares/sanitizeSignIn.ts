import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

import { CreateUser } from "../services/accessService.js";

export function sanitizeSignIn(req: Request, res: Response, next: NextFunction) {
    const signInUser: CreateUser = req.body;

    const user: CreateUser = {
        ...signInUser,
        email: stripHtml(signInUser.email).result,
        password: stripHtml(signInUser.password).result
    }

    res.locals.data = user;

    next();
}