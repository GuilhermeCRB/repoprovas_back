import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/app";
import userFactory from "./userFactory";
import { CreateUser } from "../../src/services/accessService";
import db from "../../src/config/database.js";

async function createTest() {
    const teacher = await db.teacher.findFirst();
    const discipline = await db.discipline.findFirst();
    const category = await db.category.findFirst();

    return {
        name: faker.animal.dog(),
        pdfUrl: faker.internet.url(),
        category: category.name,
        discipline: discipline.name,
        teacher: teacher.name
    };
}

async function createToken() {
    const user: CreateUser = userFactory.createUser();
    await supertest(app).post("/sign-up").send(user);
    delete user.repeatedPassword;

    const { body } = await supertest(app).post("/sign-in").send(user);
    const { token }: { token: string } = body;

    return token;
}

const testFactory = {
    createTest,
    createToken
};

export default testFactory;