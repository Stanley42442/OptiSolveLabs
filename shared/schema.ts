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

// Contact Info table
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull().default(""),
  phone: varchar("phone", { length: 20 }).notNull().default(""),
  email: varchar("email", { length: 255 }).notNull().default(""),
  location: text("location").notNull().default(""),
  businessHours: text("business_hours").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true, updatedAt: true });
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

// About Info table
export const aboutInfo = pgTable("about_info", {
  id: serial("id").primaryKey(),
  developerPictureUrl: text("developer_picture_url").notNull().default(""),
  aboutDescription: text("about_description").notNull().default(""),
  missionDescription: text("mission_description").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAboutInfoSchema = createInsertSchema(aboutInfo).omit({ id: true, updatedAt: true });
export type InsertAboutInfo = z.infer<typeof insertAboutInfoSchema>;
export type AboutInfo = typeof aboutInfo.$inferSelect;

// Home Info table
export const homeInfo = pgTable("home_info", {
  id: serial("id").primaryKey(),
  demoVideoUrl: text("demo_video_url").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertHomeInfoSchema = createInsertSchema(homeInfo).omit({ id: true, updatedAt: true });
export type InsertHomeInfo = z.infer<typeof insertHomeInfoSchema>;
export type HomeInfo = typeof homeInfo.$inferSelect;

// Service Images table
export const serviceImages = pgTable("service_images", {
  id: serial("id").primaryKey(),
  serviceId: varchar("service_id", { length: 50 }).notNull(),
  beforeImageUrl: text("before_image_url").notNull().default(""),
  afterImageUrl: text("after_image_url").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertServiceImagesSchema = createInsertSchema(serviceImages).omit({ id: true, updatedAt: true });
export type InsertServiceImages = z.infer<typeof insertServiceImagesSchema>;
export type ServiceImages = typeof serviceImages.$inferSelect;

// Website Testimonials table
export const websiteTestimonials = pgTable("website_testimonials", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  quote: text("quote").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWebsiteTestimonialsSchema = createInsertSchema(websiteTestimonials).omit({ createdAt: true });
export type InsertWebsiteTestimonials = z.infer<typeof insertWebsiteTestimonialsSchema>;
export type WebsiteTestimonials = typeof websiteTestimonials.$inferSelect;
