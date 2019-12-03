import { logger } from "../libs";

export const timeLogger = (loggingName: string = "", isStart: boolean = true) => (req: any, res: any, next: any) => {
  const currentTime: any = new Date();
  logger.debug(`Time Logger ::: ${loggingName} - ${isStart ? "START" : "END"}  ${currentTime.toISOString()} `);

  if (isStart) {
    req.startTime = currentTime;
  } else {
    const difference = currentTime - req.startTime;
    logger.debug(`Request Completed in time: ${difference} ms`);
  }

  next();
};
