import serverlessHttp from "serverless-http";
import path from "path";
import fs from "fs";
import express from "express";
import { registerRoutes } from "../server/routes";

// Create a new Express app for serverless
const app = express();

// Middleware
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

let initialized = false;

async function initializeApp() {
  if (!initialized) {
    // Register API routes
    await registerRoutes(app);
    
    // Serve static files from dist/public
    const distPath = path.resolve(process.cwd(), "dist/public");
    if (fs.existsSync(distPath)) {
      // Serve static files
      app.use(express.static(distPath));
      
      // SPA fallback - serve index.html for all non-API routes that don't have files
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
}

// Wrap with serverless-http
const handler = serverlessHttp(app);

export default async (req: any, res: any) => {
  await initializeApp();
  return handler(req, res);
};
