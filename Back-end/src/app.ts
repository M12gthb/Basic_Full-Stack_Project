import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import { handleError } from "./middlewares/handleError.middleware";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("login");

app.use("users");

app.use();

export default app;
