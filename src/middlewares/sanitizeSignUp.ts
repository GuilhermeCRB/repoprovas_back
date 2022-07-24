import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

export function sanitizeSignUp(req: Request, res: Response, next: NextFunction) {
    const signUpUser: {email: string, password: string, repeatedPassword: string } = req.body;

    const user = {
        ...signUpUser,
        email: stripHtml(signUpUser.email).result,
        password: stripHtml(signUpUser.password).result,
        repeatedPassword: stripHtml(signUpUser.repeatedPassword).result
    }

    res.locals.data = user;

    next();
}