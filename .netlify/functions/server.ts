import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

// Validate required environment variables at module load (fail-fast)
if (!process.env.ADMIN_SECRET) {
  throw new Error(
    "ADMIN_SECRET environment variable is required for admin authentication. " +
    "Please set it in Netlify environment variables."
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is required for database connection. " +
    "Please set it in Netlify environment variables."
  );
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS for Netlify
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Admin-Secret");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Register API routes
registerRoutes(app);

// Export as serverless function
export const handler = serverless(app);
