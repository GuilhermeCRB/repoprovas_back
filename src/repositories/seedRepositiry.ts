import db from "../config/database.js";

async function createAdminUser(password: string) {
    await db.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            password
        }
    });
}

const seedRepository = {
    createAdminUser
}

export default seedRepository;