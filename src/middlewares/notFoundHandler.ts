import { NextFunction, Request, Response } from "express";

import { NotFoundError } from "../entities";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError([]));
}
