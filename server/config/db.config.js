import dotenv from "dotenv";
dotenv.config();

import { Client } from "pg";

export const connection = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: 5432,
});

const dbConfig = async () => {
  try {
    await connection.connect();
    console.log(`PostgreSQL Database connected successfully.`);
  } catch (error) {
    console.log(`Unable to connect to the PostgreSQL database: ${error}`);
  }
};
export default dbConfig;
