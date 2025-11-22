import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create connection pool (compatible with all PostgreSQL providers)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL required for most managed PostgreSQL providers
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

// Initialize Drizzle with standard node-postgres driver
export const db = drizzle(pool);
