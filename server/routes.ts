import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updatePromoSlotsSchema, type PromoStatusResponse, insertContactInfoSchema, insertAboutInfoSchema, insertHomeInfoSchema, insertServiceImagesSchema, insertWebsiteTestimonialsSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { Resend } from "resend";

const ADMIN_SECRET = process.env.ADMIN_SECRET;
if (!ADMIN_SECRET) {
  throw new Error(
    "ADMIN_SECRET environment variable is required for admin authentication. " +
    "Please set it before starting the server."
  );
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendResendEmail(to: string, subject: string, htmlBody: string) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable not set");
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    
    const result = await resend.emails.send({
      from: "OptiSolve Labs <onboarding@resend.dev>",
      to,
      subject,
      html: htmlBody,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log(`Email sent to ${to} with ID: ${result.data?.id}`);
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/contact - Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const htmlBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;

      try {
        await sendResendEmail("optisolvelabs@gmail.com", `New Contact Form Submission from ${name}`, htmlBody);
      } catch (emailError) {
        console.warn("Failed to send email, but form was received:", emailError);
      }

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
      const adminSecret = req.headers["x-admin-secret"];
      
      if (!adminSecret || typeof adminSecret !== "string") {
        return res.status(401).json({ error: "Unauthorized: Admin secret required" });
      }

      if (adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized: Invalid admin secret" });
      }

      const validation = updatePromoSlotsSchema.safeParse(req.body);
      
      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const { slots } = validation.data;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

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

  // Content Management Routes (Admin Only)

  // GET /api/admin/contact-info
  app.get("/api/admin/contact-info", async (req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  // POST /api/admin/contact-info
  app.post("/api/admin/contact-info", async (req, res) => {
    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (!adminSecret || adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const validation = insertContactInfoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const info = await storage.updateContactInfo(validation.data);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact info" });
    }
  });

  // GET /api/admin/about-info
  app.get("/api/admin/about-info", async (req, res) => {
    try {
      const info = await storage.getAboutInfo();
      res.json(info || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch about info" });
    }
  });

  // POST /api/admin/about-info
  app.post("/api/admin/about-info", async (req, res) => {
    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (!adminSecret || adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const validation = insertAboutInfoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const info = await storage.updateAboutInfo(validation.data);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to update about info" });
    }
  });

  // GET /api/admin/home-info
  app.get("/api/admin/home-info", async (req, res) => {
    try {
      const info = await storage.getHomeInfo();
      res.json(info || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch home info" });
    }
  });

  // POST /api/admin/home-info
  app.post("/api/admin/home-info", async (req, res) => {
    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (!adminSecret || adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const validation = insertHomeInfoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const info = await storage.updateHomeInfo(validation.data);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to update home info" });
    }
  });

  // GET /api/admin/service-images/:serviceId
  app.get("/api/admin/service-images/:serviceId", async (req, res) => {
    try {
      const images = await storage.getServiceImages(req.params.serviceId);
      res.json(images || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service images" });
    }
  });

  // POST /api/admin/service-images/:serviceId
  app.post("/api/admin/service-images/:serviceId", async (req, res) => {
    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (!adminSecret || adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const validation = insertServiceImagesSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const images = await storage.updateServiceImages(req.params.serviceId, validation.data);
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to update service images" });
    }
  });

  // GET /api/testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // POST /api/testimonials
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validation = insertWebsiteTestimonialsSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const testimonial = await storage.createTestimonial(validation.data);
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  // DELETE /api/admin/testimonials/:id
  app.delete("/api/admin/testimonials/:id", async (req, res) => {
    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (!adminSecret || adminSecret !== ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
