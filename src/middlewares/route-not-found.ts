import { Request, Response } from "express";
import { createNotFoundError } from "../errors";

const routeNotFound = (req: Request, res: Response) => {
  throw createNotFoundError(`${req.url} does not exist`);
};

export default routeNotFound;
