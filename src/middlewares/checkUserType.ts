import { throwUnauthorizedError, throwForbiddenError } from "../helpers";
import { Request, Response, NextFunction } from "express";

interface ExtendRequest extends Request {
  currentUser?: any;
}

const checkUserType = (allowedUserTypes: Array<string> = []) => {
  return (req: ExtendRequest, res: Response, next: NextFunction) => {
    if (req.currentUser) {
      if (!allowedUserTypes.includes(req.currentUser.accountType))
        throwForbiddenError("Forbidden");
      return next();
    }
    throwUnauthorizedError("User not authorized!!!");
  };
};
export default checkUserType;
