import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import accessRepository from "../repositories/accessRepository.js";

export type CreateUser = Omit<User & {repeatedPassword?: string}, "id" | "createdAT">

async function signUpUser(user: CreateUser) {
    delete user.repeatedPassword;
    const encryptedPassword = encryptPassword(user.password);
    await accessRepository.saveUserData({ ...user, password: encryptedPassword });
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}

const accessService = {
    signUpUser
};

export default accessService;