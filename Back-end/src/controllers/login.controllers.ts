import { Request, Response } from "express";
import { loginReturn } from "../interfaces/login.interfaces";
import { loginServices } from "../services/login.services";

const requestLogin = async (req: Request, res: Response): Promise<void> => {
  const token: loginReturn = await loginServices(req.body);
  res.status(200).json(token);
};

export { requestLogin };
