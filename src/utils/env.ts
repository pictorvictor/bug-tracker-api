import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';
config();

export const {
  NODE_ENV,
  PORT,
  API_URL,
  FRONTEND_URL,
  LOG_FORMAT,
  LOG_DIR,
  DATABASE_URL,
  JWT_ACCESS_SECRET,
} = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  API_URL: str(),
  FRONTEND_URL: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  DATABASE_URL: str(),
  JWT_ACCESS_SECRET: str(),
});
