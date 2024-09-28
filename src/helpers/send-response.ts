import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface SuccessResponseData {
  [key: string]: any;
}

export const sendSuccessResponse = (
  res: Response,
  data: SuccessResponseData = {},
  status: number = StatusCodes.OK
): void => {
  res.status(status).json({ success: true, status, ...data });
};
