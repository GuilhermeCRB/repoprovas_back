import supertest from "supertest";
import dotenv from "dotenv";

import db from "../src/config/database";
import app from "../src/app";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
  await db.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

dotenv.config();

console.log(process.env.DATABASE_URL)

describe("Sign up tests:", () => {
    it("Given an email and a password, sign up a user.", async () => {
        const user = await userFactory.createUser();
        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.statusCode).toBe(201);
    });
});

afterAll(async () => {
    await db.$disconnect();
});