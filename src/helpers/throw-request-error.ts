import {
  createBadRequestError,
  createConflictError,
  createForbiddenError,
  createMethodNotAllowedError,
  createNotFoundError,
  createUnauthorizedError,
  createUnprocessableEntityError,
} from "../errors";
import CustomError from "../errors/CustomError";
import { ReasonPhrases } from "http-status-codes";

export const throwBadRequestError = (message: string) => {
  throw createBadRequestError(message);
};

export const throwConflictError = (message: string) => {
  throw createConflictError(message);
};

export const throwMethodNotAllowedError = (message: string) => {
  throw createMethodNotAllowedError(message);
};

export const throwNotFoundError = (message: string) => {
  throw createNotFoundError(message);
};

export const throwUnauthorizedError = (message: string) => {
  throw createUnauthorizedError(message);
};

export const throwUnprocessableEntityError = (message: string) => {
  throw createUnprocessableEntityError(message);
};

export const throwForbiddenError = (message: string) => {
  throw createForbiddenError(message);
};

export const throwServerError = (message: string) => {
  throw new CustomError(message || ReasonPhrases.INTERNAL_SERVER_ERROR);
};
