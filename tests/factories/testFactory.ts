import { faker } from "@faker-js/faker";

function createTest() {
    return {
        name: faker.animal.dog(),
        pdfUrl: faker.internet.url(),
        category: faker.animal.dog(),
        discipline: faker.animal.dog(),
        teacher: faker.name.findName()
    };
}

const testFactory = {
    createTest
};

export default testFactory;