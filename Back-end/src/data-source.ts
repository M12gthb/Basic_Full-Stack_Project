import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const settings = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: "mysql",
    url: dbUrl,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
    charset: "utf8mb4",
    timezone: "Z",
  };
};

const AppDataSource = new DataSource(settings());

export { AppDataSource };
