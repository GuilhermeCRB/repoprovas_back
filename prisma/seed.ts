import bcrypt from "bcrypt";

import db from "../src/config/database.js";
import seedRepository from "../src/repositories/seedRepositiry.js";

async function main() {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync("admin", SALT);
    seedRepository.createAdminUser(hashedPassword);
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await db.$disconnect();
})