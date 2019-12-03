import { logger } from "../libs";

export function controllerAdapter(controller: any = null, functionName: string = "") {
  return async (req: any, res: any, next: any) => {
    const {
      headers: { authorization },
      params,
      query,
      body
    } = req;
    const { locals } = res;
    try {
      if (locals.isHit) {
        return next();
      }

      const result = await controller[functionName]({ headers: { authorization }, params, query, locals, body });

      res.locals.isHit = true;

      res.status(result.metadata.code).json(result);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  };
}
