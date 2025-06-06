import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { usersRepository } from "../repositories";
import { AppError } from "../error/App.error";
import { validate as uuidValidate } from "uuid";

export const verifyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!uuidValidate(req.params.id)) {
    throw new AppError("user not found", 404);
  }
  const id: string = req.params.id;

  const foundEntity: User | null = await usersRepository.findOneBy({ id });
  if (!foundEntity) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, foundEntity };

  return next();
};
