import db from "../config/database.js";

import { CreateUser } from "../services/accessService.js"

async function saveUserData(userData: CreateUser) {
    await db.user.create({
        data: userData
    });
}

async function getUserByEmail(email: string) {
    return await db.user.findUnique({
        where: { email }
    });
}

const accessRepository = {
    getUserByEmail,
    saveUserData
}

export default accessRepository;