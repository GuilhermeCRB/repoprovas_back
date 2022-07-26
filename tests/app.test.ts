import supertest from "supertest";
import dotenv from "dotenv";

import db from "../src/config/database";
import app from "../src/app";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";
import { CreateUser } from "../src/services/accessService.js";
import testsService, { TestInputs } from "../src/services/testsService.js";
import accessRepository from "../src/repositories/accessRepository.js";

beforeEach(async () => {
    await db.$executeRaw`TRUNCATE TABLE users`;
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

afterAll(async () => {
    await db.$disconnect();
});