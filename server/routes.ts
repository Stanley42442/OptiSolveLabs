import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updatePromoSlotsSchema, type PromoStatusResponse } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Require ADMIN_SECRET environment variable - fail fast if not set
const ADMIN_SECRET = process.env.ADMIN_SECRET;
if (!ADMIN_SECRET) {
  throw new Error(
    "ADMIN_SECRET environment variable is required for admin authentication. " +
    "Please set it before starting the server."
  );
}

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/contact - Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      // Log the message (in production, this would be sent to email or database)
      console.log(`Contact form submission: ${name} (${email}) - ${message}`);

      res.json({
        success: true,
        message: "Message received! We'll get back to you on WhatsApp shortly.",
      });
    } catch (error) {
      console.error("Error handling contact form:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // GET /api/promo/status - Get current promo status
  app.get("/api/promo/status", async (req, res) => {
    try {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      let status = await storage.getPromoStatus(currentMonth, currentYear);

      // If no status exists for current month, create one with 3 slots
      if (!status) {
        status = await storage.createPromoStatus(currentMonth, currentYear, 3);
      }

      const response: PromoStatusResponse = {
        slotsRemaining: status.slotsRemaining,
        promoActive: status.slotsRemaining > 0,
        month: currentMonth,
        year: currentYear,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching promo status:", error);
      res.status(500).json({ error: "Failed to fetch promo status" });
    }
  });

  // POST /api/promo/update-slots - Update promo slots (admin only)
  app.post("/api/promo/update-slots", async (req, res) => {
    try {
      // Verify admin secret from header
      const adminSecret = req.headers["x-admin-secret"];
      
      if (!adminSecret || typeof adminSecret !== "string") {
        return res.status(401).json({ error: "Unauthorized: Admin secret required" });
      }

      if (adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized: Invalid admin secret" });
      }

      // Validate request body with Zod schema
      const validation = updatePromoSlotsSchema.safeParse(req.body);
      
      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const { slots } = validation.data;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Update the slots
      const status = await storage.updatePromoSlots(currentMonth, currentYear, slots);

      const response: PromoStatusResponse = {
        slotsRemaining: status.slotsRemaining,
        promoActive: status.slotsRemaining > 0,
        month: currentMonth,
        year: currentYear,
      };

      res.json(response);
    } catch (error) {
      console.error("Error updating promo slots:", error);
      res.status(500).json({ error: "Failed to update promo slots" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
