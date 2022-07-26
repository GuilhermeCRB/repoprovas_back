import supertest from "supertest";
import dotenv from "dotenv";

import db from "../src/config/database";
import app from "../src/app";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";
import databaseFactory from "./factories/databaseFactory.js";
import accessRepository from "../src/repositories/accessRepository.js";
import { TestInputs } from "../src/services/testsService.js";
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

    it("Send status 422 if confirmation password is not sent", async () => {
        const user: CreateUser = userFactory.createUser();
        user.repeatedPassword = "";

        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.statusCode).toBe(422);
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

    it("Block sign in if password is wrong.", async () => {
        const user: CreateUser = userFactory.createUser();
        await supertest(app).post("/sign-up").send(user);
        delete user.repeatedPassword;
        user.password = "wrongPassword";

        const response = await supertest(app).post("/sign-in").send(user);
        expect(response.statusCode).toBe(401);
    });
});

describe("Tests tests:", () => {
    it("Given a name, a pdf url, a category, a discipline and a teacher, save a test in database.", async () => {
        await databaseFactory();

        const test: TestInputs = await testFactory.createTest();
        const token = await testFactory.createToken();

        const response = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(test);
        expect(response.statusCode).toBe(201);

        const createdTest = db.test.findFirst();
        expect(createdTest).not.toBeNull();
    });

    it("Should return all tests divided by terms.", async () => {
        await databaseFactory();

        const token = await testFactory.createToken();
        const response = await supertest(app).get("/tests?filter=term").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    it("Should return all tests divided by teachers.", async () => {
        await databaseFactory();

        const token = await testFactory.createToken();
        const response = await supertest(app).get("/tests?filter=teacher").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    it("Block user from posting a test if token is wrong or is not sent.", async () => {
        const test = {
            name: "test",
            pdfUrl: "test",
            category: "test",
            discipline: "test",
            teacher: "test"
        };

        const wrongToken = "wrongToken";
        const wrongTokenResponse = await supertest(app).post("/tests").set("Authorization", `Bearer ${wrongToken}`).send(test);
        expect(wrongTokenResponse.statusCode).toBe(403);

        const noTokenResponse = await supertest(app).post("/tests").send(test);
        expect(noTokenResponse.statusCode).toBe(401);
    });

    it("Block user from getting the tests divided by terms if token is wrong or is not sent.", async () => {
        const wrongToken = "wrongToken";
        const wrongTokenResponse = await supertest(app).get("/tests?filter=term").set("Authorization", `Bearer ${wrongToken}`);
        expect(wrongTokenResponse.statusCode).toBe(403);

        const noTokenResponse = await supertest(app).get("/tests?filter=term");
        expect(noTokenResponse.statusCode).toBe(401);
    });

    it("Block user from getting the tests divided by teacher if token is wrong or is not sent.", async () => {
        const wrongToken = "wrongToken";
        const wrongTokenResponse = await supertest(app).get("/tests?filter=teacher").set("Authorization", `Bearer ${wrongToken}`);
        expect(wrongTokenResponse.statusCode).toBe(403);

        const noTokenResponse = await supertest(app).get("/tests?filter=teacher");
        expect(noTokenResponse.statusCode).toBe(401);
    });
});

afterAll(async () => {
    await db.$disconnect();
});