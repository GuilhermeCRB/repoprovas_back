import { Request, Response } from "express";

import testsService, { TestInputs } from "../services/testsService.js";

export async function postTest(req: Request, res: Response) {
    const test: TestInputs = res.locals.data;
    await testsService.saveTest(test);
    res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
    const { filter } = req.query;
    const tests = await testsService.getTestsByQuery(filter);
    res.status(200).send(tests);
}