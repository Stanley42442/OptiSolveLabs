import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";
import { fileURLToPath } from "node:url";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // Get the directory of this file (__dirname equivalent in ESM)
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.join(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Build directory not found at: ${distPath}`);
    console.error(`Current __dirname: ${__dirname}`);
    console.error(`Available files: ${fs.readdirSync(__dirname).join(", ")}`);
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
