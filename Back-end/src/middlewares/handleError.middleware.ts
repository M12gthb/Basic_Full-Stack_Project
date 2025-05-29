import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/App.error";
import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

const handleError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.status).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ message: error.message });
  }

  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

export { handleError };
