import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "./interfaces/Error";
import CustomError from "./CustomError";

export default class ForbiddenError
  extends CustomError
  implements CustomErrorInterface
{
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export const createForbiddenError = (message: string) =>
  new ForbiddenError(message);
