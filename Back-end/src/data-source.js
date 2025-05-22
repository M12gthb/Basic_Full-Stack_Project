import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = () => {
  const entitiesPath = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath = path.join(__dirname, "./migrations/**.{ts,js}");

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  const dbUrl  = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Missing env var: 'DATABASE_URL'");
  }

  return {
    type: "postgres",
    url: dbUrl,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };