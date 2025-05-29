import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../repositories";
import { AppError } from "../error/App.error";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  // Se não tiver email no body, pula a verificação
  if (!email) return next();

  // Verifica se email já existe
  const userExists = await usersRepository.findOne({
    where: { email },
    withDeleted: true, // Inclui usuários deletados se usar soft delete
  });

  if (userExists) {
    throw new AppError("Email already exists", 409);
  }

  next();
};
