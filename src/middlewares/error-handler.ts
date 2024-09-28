import { StatusCodes, ReasonPhrases } from "http-status-codes";
import CustomError from "../errors/CustomError";
import { createConflictError } from "../errors/Conflict";
import { Request, Response, NextFunction } from "express";
import { CustomErrorInterface } from "../errors/interfaces/Error";
// import { errorLogger } from "./req-logger.cjs";
// import { saveToErrorDetails } from "../helpers";

interface ErrorObject {
  status?: number;
  message?: string;
}

// Define a type guard function to check if an object implements CustomErrorInterface
function isCustomError(error: any): error is CustomErrorInterface {
  return typeof error === "object" && "statusCode" in error;
  // Replace 'customProperty' with a property or method that uniquely identifies CustomErrorInterface
}

const errorHandler = (
  err: CustomErrorInterface | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorObject: ErrorObject = {};

  console.log(err);

  if (err instanceof CustomError && isCustomError(err)) {
    errorObject.status = err?.statusCode;
    errorObject.message = err.message;
  }
  if (err && err.name === "ValidationError") {
    errorObject.status = StatusCodes.BAD_REQUEST;
    errorObject.message = err.message;
  }
  if (err && err.code === 11000) {
    let message = Object.keys(err.keyValue).join(", ");
    let newConflictError = createConflictError(`${message} already exist`);
    errorObject.status = newConflictError.statusCode;
    errorObject.message = newConflictError.message;
  }
  if (
    err &&
    (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
  ) {
    errorObject.message = err.message;
    errorObject.status = StatusCodes.UNAUTHORIZED;
  }
  if (err && err.name === "CastError") {
    errorObject.message = `${err?.value} is not a valid ${err?.kind}`;
    errorObject.status = StatusCodes.BAD_REQUEST;
  }
  if (
    err &&
    (err.type === "entity.parse.failed" || err.name === "SyntaxError")
  ) {
    errorObject.status = err?.statusCode || err?.status;
    errorObject.message = "JSON"
      ? "Invalid JSON format in the request body. Please ensure there are no trailing commas."
      : "Syntax Error: Invalid data format.";
  }
  let status = errorObject?.status || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    success: false,
    status,
    message: errorObject?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
