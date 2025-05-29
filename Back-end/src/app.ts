import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import { handleError } from "./middlewares/handleError.middleware";
import { loginRouters } from "./routes/login.routers";
import { usersRouter } from "./routes/users.routers";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/login", loginRouters);

app.use("/users", usersRouter);

app.use(handleError);

export default app;
