import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "./interfaces/Error";
import CustomError from "./CustomError";

export default class MethodNotAllowedError
  extends CustomError
  implements CustomErrorInterface
{
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  }
}

export const createMethodNotAllowedError = (message: string) =>
  new MethodNotAllowedError(message);
