import { Request, Response } from "express";
import {
  updateUserService,
  userCreateService,
  userDeleteService,
  userReadService,
} from "../services/users.services";
import { UserRead, UserReturn } from "../interfaces/users.interfaces";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const user: UserReturn = await userCreateService(req.body);

  res.status(201).json(user);
};

const readUser = async (req: Request, res: Response): Promise<void> => {
  const users: UserRead = await userReadService();

  res.status(200).json(users);
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const user: UserReturn = await updateUserService(
    res.locals.foundEntity,
    req.body
  );

  res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  await userDeleteService(res.locals.foundEntity);

  res.status(204).json();
};

export { createUser, readUser, deleteUser, updateUser };
