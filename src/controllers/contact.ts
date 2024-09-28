import { Request, Response } from "express";
import { throwErrorIfBodyIsEmpty } from "../utils";
import {
  sendContactEmail,
  sendSuccessResponse,
  submitSurveyEmail,
} from "../helpers";

export const submitContactRequest = async (req: Request, res: Response) => {
  const data = req.body;
  throwErrorIfBodyIsEmpty(
    data,
    ["fullName", "email"],
    "Provide all required fields"
  );
  await sendContactEmail(data);
  return sendSuccessResponse(res, {
    message: "Form submitted successfully. Kindly await our response.",
  });
};

export const submitSurvey = async (req: Request, res: Response) => {
  const data = req.body;
  throwErrorIfBodyIsEmpty(data, [], "Please provide all required fields");
  await submitSurveyEmail(data);
  return sendSuccessResponse(res, { message: "Thank you for your time!" });
};
