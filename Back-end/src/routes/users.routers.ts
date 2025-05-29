import { Router } from "express";
import { verifyUserId } from "../middlewares/verifyUserId.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, patchUserSchema } from "../schemas/users.schema";
import { verifyEmail } from "../middlewares/verifyEmailexist.middleware";
import {
  createUser,
  deleteUser,
  readUser,
  updateUser,
} from "../controllers/users.controllers";

const usersRouters: Router = Router();

usersRouters.post("", validateBody(createUserSchema), verifyEmail, createUser);

usersRouters.get("", readUser);

usersRouters.patch(
  "/:id",
  verifyToken,
  verifyUserId,
  validateBody(patchUserSchema),
  verifyEmail,
  updateUser
);

usersRouters.delete("/:id", verifyToken, verifyUserId, deleteUser);

export { usersRouters };
