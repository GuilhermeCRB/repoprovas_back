import supertest from "supertest";
import dotenv from "dotenv";

import db from "../src/config/database";
import app from "../src/app";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";
import databaseFactory from "./factories/databaseFactory.js";
import accessRepository from "../src/repositories/accessRepository.js";
import testsService, { TestInputs } from "../src/services/testsService.js";
import { CreateUser } from "../src/services/accessService.js";

beforeEach(async () => {
    await db.$transaction([
        db.$executeRaw`TRUNCATE TABLE users`,
        db.$executeRaw`TRUNCATE TABLE tests CASCADE`,
        db.$executeRaw`TRUNCATE TABLE terms CASCADE`,
        db.$executeRaw`TRUNCATE TABLE teachers CASCADE`,
        db.$executeRaw`TRUNCATE TABLE categories CASCADE`,
        db.$executeRaw`TRUNCATE TABLE disciplines CASCADE`,
        db.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`,
    ]);
});

dotenv.config();

describe("Access tests:", () => {
    it("Given an email and a password, sign up a user.", async () => {
        const user: CreateUser = userFactory.createUser();
        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.statusCode).toBe(201);

        const createdUser = accessRepository.getUserByEmail(user.email);
        expect(createdUser).not.toBeNull();
    });

    it("Given an email and a password, sign in a user.", async () => {
        const user: CreateUser = userFactory.createUser();
        await supertest(app).post("/sign-up").send(user);
        delete user.repeatedPassword;

        const response = await supertest(app).post("/sign-in").send(user);
        expect(response.statusCode).toBe(200);

        const { token }: { token: string } = response.body;
        expect(token).not.toBeNull();
    });
});

describe("Tests tests:", () => {
    it("Given a name, a pdf url, a category, a discipline and a teacher, save a test in database.", async () => {
        await databaseFactory();

        const test: TestInputs = await testFactory.createTest();
        const token = await testFactory.createToken();

        const response = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(test);
        expect(response.statusCode).toBe(201);
    });
});

afterAll(async () => {
    await db.$disconnect();
});