import { validationResult } from "express-validator/check";

import { IError, UnprocessableError } from "../entities";

export function schemaErrorHandler(req: any, res: any, next: any) {
  if (res.locals.isHit) {
    return next();
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new UnprocessableError(errors.array() as IError[]));
  }

  next();
}
