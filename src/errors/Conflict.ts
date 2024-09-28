import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "./interfaces/Error";
import CustomError from "./CustomError";

export default class ConflictError
  extends CustomError
  implements CustomErrorInterface
{
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export const createConflictError = (message: string) =>
  new ConflictError(message);
