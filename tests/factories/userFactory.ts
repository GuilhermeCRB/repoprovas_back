import { faker } from "@faker-js/faker";

async function createUser() {
    const SALT = 10;
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password,
        repeatedPassword: password
    };
}

const userFactory = {
    createUser
};

export default userFactory;