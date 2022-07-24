import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) return res.status(401).send("Must send a token");

    jwt.verify(token, process.env.SECRET_KEY, (e, user) => {
        if(e) return res.status(403).send("Invalid token");
        res.locals.user = user;
    });

    next();
}