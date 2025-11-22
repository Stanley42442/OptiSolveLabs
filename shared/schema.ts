import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Promo status table for persistent storage across serverless instances
export const promoStatuses = pgTable("promo_statuses", {
  id: serial("id").primaryKey(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  slotsRemaining: integer("slots_remaining").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertPromoStatusSchema = createInsertSchema(promoStatuses).omit({ id: true, lastUpdated: true });
export type InsertPromoStatus = z.infer<typeof insertPromoStatusSchema>;
export type PromoStatusDB = typeof promoStatuses.$inferSelect;

// Promo status interface (kept for compatibility)
export interface PromoStatus {
  month: number;
  year: number;
  slotsRemaining: number;
  lastUpdated: Date;
}

export interface PromoStatusResponse {
  slotsRemaining: number;
  promoActive: boolean;
  month: number;
  year: number;
}

// Service pricing data
export interface PricingTier {
  name: string;
  originalPrice: number;
  deliveryTime: string;
  features: string[];
}

// Service metadata
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  pricing: PricingTier[];
}

// Testimonial data
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
}

// Promo update request schema (only slots in body, secret in header)
export const updatePromoSlotsSchema = z.object({
  slots: z.number().min(0, "Slots must be non-negative"),
});

export type UpdatePromoSlotsRequest = z.infer<typeof updatePromoSlotsSchema>;
