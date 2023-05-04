import 'dotenv/config';

export const { PORT } = process.env;

export const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

export const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const SIGTERM = 'SIGTERM';
