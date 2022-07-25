import { Request, Response } from "express";

import testsService, { TestInputs } from "../services/testsService.js";

export async function postTest(req: Request, res: Response) {
    const test: TestInputs = res.locals.data;
    await testsService.saveTest(test);
    res.sendStatus(201);
}