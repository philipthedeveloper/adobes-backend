import { ReasonPhrases } from "http-status-codes";
import { createMethodNotAllowedError } from "../errors";
import { NextFunction, Request, Response } from "express";

const ALLOWED_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
];
const methodChecker = (req: Request, res: Response, next: NextFunction) => {
  if (!ALLOWED_METHODS.includes(req.method.toUpperCase()))
    throw createMethodNotAllowedError(ReasonPhrases.METHOD_NOT_ALLOWED);
  next();
};

export default methodChecker;
