import serverlessHttp from "serverless-http";
import path from "path";
import fs from "fs";
import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();

// Middleware
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Initialize on first request
let initialized = false;
async function initialize() {
  if (initialized) return;
  try {
    await registerRoutes(app);
  } catch (err) {
    console.error("Failed to register routes:", err);
  }
  
  // Serve static frontend files after routes
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    
    // SPA fallback
    app.use((req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }
  
  initialized = true;
}

// Wrap with serverless-http
const handler = serverlessHttp(app);

export default async (req: any, res: any) => {
  await initialize();
  return handler(req, res);
};
