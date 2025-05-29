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
  readUserId,
} from "../controllers/users.controllers";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";

const usersRouter: Router = Router();

// Rota POST /users
usersRouter.post("", validateBody(createUserSchema), verifyEmail, createUser);

// Rota GET /users
usersRouter.get("", readUser);

usersRouter.get("/:id", verifyUserId, readUserId);

// Rota PATCH /users/:id
usersRouter.patch(
  "/:id",
  verifyToken,
  verifyPermissions,
  verifyUserId,
  validateBody(patchUserSchema),
  verifyEmail,
  updateUser
);

// Rota DELETE /users/:id
usersRouter.delete(
  "/:id",
  verifyToken,
  verifyPermissions,
  verifyUserId,
  deleteUser
);

export { usersRouter };
