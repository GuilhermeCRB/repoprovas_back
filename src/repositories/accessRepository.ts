import db from "../config/database.js";

import { CreateUser } from "../services/accessService.js"

async function saveUserData(userData: CreateUser) {
    await db.user.create({
        data: userData
    });
}

const accessRepository = {
    saveUserData
}

export default accessRepository;