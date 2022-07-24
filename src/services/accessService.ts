import { User } from "@prisma/client";
import { Response } from "express";
import bcrypt from "bcrypt";

import accessRepository from "../repositories/accessRepository.js";

export type CreateUser = Omit<User & { repeatedPassword?: string }, "id" | "createdAT">

async function signUpUser(user: CreateUser) {
    delete user.repeatedPassword;
    const encryptedPassword = encryptPassword(user.password);
    await accessRepository.saveUserData({ ...user, password: encryptedPassword });
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}

async function signInUser(res: Response, user: CreateUser){
    const tokenInfo = await matchEmailAndPassword(res, user);
}

async function matchEmailAndPassword(res: Response, user: CreateUser) {
    const userFromDb: User = await accessRepository.getUserByEmail(user.email);
    const isValidated: boolean = bcrypt.compareSync(user.password, userFromDb.password);
    if (!userFromDb || !isValidated) return res.status(401).send("Not allowed. Check your email and password.");

    return {id: userFromDb.id, email: userFromDb.email};
}


const accessService = {
    signUpUser,
    signInUser
};

export default accessService;