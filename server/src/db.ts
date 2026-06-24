import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432), // PostgreSQL default is 5432
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT NOW()");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  } finally {
    client.release();
  }
}

export default pool;
