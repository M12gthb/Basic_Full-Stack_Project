import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { usersRepository } from "../repositories";
import { AppError } from "../error/App.error";
import jwt from "jsonwebtoken";
export const verifyPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;
  const authHeader = req.headers.authorization!;
  const token = authHeader.split(" ")[1];
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY!);
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
  const userIdFromToken = decoded.sub;

  if (userIdFromToken !== id) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
