import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
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

// Promo status interface for in-memory storage
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
