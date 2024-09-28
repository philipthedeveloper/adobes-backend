import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "./interfaces/Error";
import CustomError from "./CustomError";

export default class NotFoundError
  extends CustomError
  implements CustomErrorInterface
{
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export const createNotFoundError = (message: string) =>
  new NotFoundError(message);
