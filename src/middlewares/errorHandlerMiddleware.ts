import { NextFunction, Request, Response } from "express";

export function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  res.sendStatus(500);
}
