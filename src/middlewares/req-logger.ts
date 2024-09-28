import { NextFunction, Request, Response } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} => ${req.url} => ${req.body}`);
  next();
};

export default requestLogger;

// module.exports = { morganLogger, errorLogger, requestLogger };
