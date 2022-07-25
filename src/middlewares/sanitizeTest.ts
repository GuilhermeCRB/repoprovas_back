import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

import { TestInputs } from "../services/testsService.js";

export function sanitizeTest(req: Request, res: Response, next: NextFunction) {
    const test: TestInputs = req.body;

    const sanitizedTest: TestInputs = {
        ...test,
        name: stripHtml(test.name).result,
        pdfUrl: stripHtml(test.pdfUrl).result,
        category: stripHtml(test.category).result,
        discipline: stripHtml(test.discipline).result,
        teacher: stripHtml(test.teacher).result
    }

    res.locals.data = sanitizedTest;

    next();
}