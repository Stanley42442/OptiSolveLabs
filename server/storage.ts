import { type User, type InsertUser, type PromoStatus, users, promoStatuses, contactInfo, aboutInfo, homeInfo, serviceImages, websiteTestimonials, servicePricing, type ContactInfo, type AboutInfo, type HomeInfo, type ServiceImages, type WebsiteTestimonials, type InsertContactInfo, type InsertAboutInfo, type InsertHomeInfo, type InsertServiceImages, type InsertWebsiteTestimonials, type ServicePricing, type InsertServicePricing } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Promo status methods
  getPromoStatus(month: number, year: number): Promise<PromoStatus | undefined>;
  createPromoStatus(month: number, year: number, slots: number): Promise<PromoStatus>;
  updatePromoSlots(month: number, year: number, slots: number): Promise<PromoStatus>;

  // Contact info methods
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(info: InsertContactInfo): Promise<ContactInfo>;

  // About info methods
  getAboutInfo(): Promise<AboutInfo | undefined>;
  updateAboutInfo(info: InsertAboutInfo): Promise<AboutInfo>;

  // Home info methods
  getHomeInfo(): Promise<HomeInfo | undefined>;
  updateHomeInfo(info: InsertHomeInfo): Promise<HomeInfo>;

  // Service images methods
  getServiceImages(serviceId: string): Promise<ServiceImages | undefined>;
  updateServiceImages(serviceId: string, images: InsertServiceImages): Promise<ServiceImages>;

  // Testimonials methods
  getTestimonials(): Promise<WebsiteTestimonials[]>;
  deleteTestimonial(id: string): Promise<void>;
  createTestimonial(testimonial: InsertWebsiteTestimonials): Promise<WebsiteTestimonials>;

  // Service pricing methods
  getServicePricing(serviceId: string): Promise<ServicePricing[]>;
  updateServicePricing(serviceId: string, pricing: InsertServicePricing[]): Promise<ServicePricing[]>;
}

class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private promoStatuses: Map<string, PromoStatus> = new Map();
  private contactData: ContactInfo | undefined;
  private aboutData: AboutInfo | undefined;
  private homeData: HomeInfo | undefined;
  private serviceImagesData: Map<string, ServiceImages> = new Map();
  private testimonialsData: Map<string, WebsiteTestimonials> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = Math.random().toString(36).substring(7);
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPromoStatus(month: number, year: number): Promise<PromoStatus | undefined> {
    const key = `${month}-${year}`;
    return this.promoStatuses.get(key);
  }

  async createPromoStatus(month: number, year: number, slots: number): Promise<PromoStatus> {
    const key = `${month}-${year}`;
    const status: PromoStatus = {
      month,
      year,
      slotsRemaining: slots,
      lastUpdated: new Date(),
    };
    this.promoStatuses.set(key, status);
    return status;
  }

  async updatePromoSlots(month: number, year: number, slots: number): Promise<PromoStatus> {
    const key = `${month}-${year}`;
    const existing = this.promoStatuses.get(key);
    
    if (existing) {
      existing.slotsRemaining = slots;
      existing.lastUpdated = new Date();
      return existing;
    } else {
      return await this.createPromoStatus(month, year, slots);
    }
  }

  async getContactInfo(): Promise<ContactInfo | undefined> {
    return this.contactData;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const updated: ContactInfo = {
      id: this.contactData?.id || 1,
      whatsapp: info.whatsapp || "",
      phone: info.phone || "",
      email: info.email || "",
      location: info.location || "",
      businessHours: info.businessHours || "",
      updatedAt: new Date(),
    };
    this.contactData = updated;
    return this.contactData;
  }

  async getAboutInfo(): Promise<AboutInfo | undefined> {
    return this.aboutData;
  }

  async updateAboutInfo(info: InsertAboutInfo): Promise<AboutInfo> {
    const updated: AboutInfo = {
      id: this.aboutData?.id || 1,
      developerPictureUrl: info.developerPictureUrl || "",
      aboutDescription: info.aboutDescription || "",
      missionDescription: info.missionDescription || "",
      updatedAt: new Date(),
    };
    this.aboutData = updated;
    return this.aboutData;
  }

  async getHomeInfo(): Promise<HomeInfo | undefined> {
    return this.homeData;
  }

  async updateHomeInfo(info: InsertHomeInfo): Promise<HomeInfo> {
    const updated: HomeInfo = {
      id: this.homeData?.id || 1,
      demoVideoUrl: info.demoVideoUrl || "",
      updatedAt: new Date(),
    };
    this.homeData = updated;
    return this.homeData;
  }

  async getServiceImages(serviceId: string): Promise<ServiceImages | undefined> {
    return this.serviceImagesData.get(serviceId);
  }

  async updateServiceImages(serviceId: string, images: InsertServiceImages): Promise<ServiceImages> {
    const data: ServiceImages = {
      id: this.serviceImagesData.get(serviceId)?.id || Math.floor(Math.random() * 1000000),
      serviceId,
      beforeImageUrl: images.beforeImageUrl || "",
      afterImageUrl: images.afterImageUrl || "",
      updatedAt: new Date(),
    };
    this.serviceImagesData.set(serviceId, data);
    return data;
  }

  async getTestimonials(): Promise<WebsiteTestimonials[]> {
    return Array.from(this.testimonialsData.values());
  }

  async deleteTestimonial(id: string): Promise<void> {
    this.testimonialsData.delete(id);
  }

  async createTestimonial(testimonial: InsertWebsiteTestimonials): Promise<WebsiteTestimonials> {
    const data: WebsiteTestimonials = {
      ...testimonial,
      createdAt: new Date(),
    };
    this.testimonialsData.set(testimonial.id, data);
    return data;
  }

  async getServicePricing(serviceId: string): Promise<ServicePricing[]> {
    return [];
  }

  async updateServicePricing(serviceId: string, pricing: InsertServicePricing[]): Promise<ServicePricing[]> {
    return pricing.map((p, idx) => ({
      id: idx,
      serviceId,
      tierName: p.tierName,
      originalPrice: p.originalPrice,
      deliveryTime: p.deliveryTime,
      features: p.features,
      updatedAt: new Date(),
    })) as ServicePricing[];
  }
}

export class DBStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getPromoStatus(month: number, year: number): Promise<PromoStatus | undefined> {
    const result = await db
      .select()
      .from(promoStatuses)
      .where(and(eq(promoStatuses.month, month), eq(promoStatuses.year, year)))
      .limit(1);
    
    if (!result[0]) return undefined;
    
    return {
      month: result[0].month,
      year: result[0].year,
      slotsRemaining: result[0].slotsRemaining,
      lastUpdated: result[0].lastUpdated,
    };
  }

  async createPromoStatus(month: number, year: number, slots: number): Promise<PromoStatus> {
    const result = await db
      .insert(promoStatuses)
      .values({
        month,
        year,
        slotsRemaining: slots,
      })
      .returning();
    
    return {
      month: result[0].month,
      year: result[0].year,
      slotsRemaining: result[0].slotsRemaining,
      lastUpdated: result[0].lastUpdated,
    };
  }

  async updatePromoSlots(month: number, year: number, slots: number): Promise<PromoStatus> {
    const existing = await this.getPromoStatus(month, year);
    
    if (existing) {
      const result = await db
        .update(promoStatuses)
        .set({
          slotsRemaining: slots,
          lastUpdated: new Date(),
        })
        .where(and(eq(promoStatuses.month, month), eq(promoStatuses.year, year)))
        .returning();
      
      return {
        month: result[0].month,
        year: result[0].year,
        slotsRemaining: result[0].slotsRemaining,
        lastUpdated: result[0].lastUpdated,
      };
    } else {
      return await this.createPromoStatus(month, year, slots);
    }
  }

  async getContactInfo(): Promise<ContactInfo | undefined> {
    const result = await db.select().from(contactInfo).limit(1);
    return result[0];
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const existing = await this.getContactInfo();
    if (existing) {
      const result = await db.update(contactInfo).set(info).where(eq(contactInfo.id, existing.id)).returning();
      return result[0];
    } else {
      const result = await db.insert(contactInfo).values(info).returning();
      return result[0];
    }
  }

  async getAboutInfo(): Promise<AboutInfo | undefined> {
    const result = await db.select().from(aboutInfo).limit(1);
    return result[0];
  }

  async updateAboutInfo(info: InsertAboutInfo): Promise<AboutInfo> {
    const existing = await this.getAboutInfo();
    if (existing) {
      const result = await db.update(aboutInfo).set(info).where(eq(aboutInfo.id, existing.id)).returning();
      return result[0];
    } else {
      const result = await db.insert(aboutInfo).values(info).returning();
      return result[0];
    }
  }

  async getHomeInfo(): Promise<HomeInfo | undefined> {
    const result = await db.select().from(homeInfo).limit(1);
    return result[0];
  }

  async updateHomeInfo(info: InsertHomeInfo): Promise<HomeInfo> {
    const existing = await this.getHomeInfo();
    if (existing) {
      const result = await db.update(homeInfo).set(info).where(eq(homeInfo.id, existing.id)).returning();
      return result[0];
    } else {
      const result = await db.insert(homeInfo).values(info).returning();
      return result[0];
    }
  }

  async getServiceImages(serviceId: string): Promise<ServiceImages | undefined> {
    const result = await db.select().from(serviceImages).where(eq(serviceImages.serviceId, serviceId)).limit(1);
    return result[0];
  }

  async updateServiceImages(serviceId: string, images: InsertServiceImages): Promise<ServiceImages> {
    const existing = await this.getServiceImages(serviceId);
    if (existing) {
      const result = await db.update(serviceImages).set(images).where(eq(serviceImages.id, existing.id)).returning();
      return result[0];
    } else {
      const result = await db.insert(serviceImages).values(images).returning();
      return result[0];
    }
  }

  async getTestimonials(): Promise<WebsiteTestimonials[]> {
    return await db.select().from(websiteTestimonials);
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(websiteTestimonials).where(eq(websiteTestimonials.id, id));
  }

  async createTestimonial(testimonial: InsertWebsiteTestimonials): Promise<WebsiteTestimonials> {
    const result = await db.insert(websiteTestimonials).values(testimonial).returning();
    return result[0];
  }

  async getServicePricing(serviceId: string): Promise<ServicePricing[]> {
    return await db.select().from(servicePricing).where(eq(servicePricing.serviceId, serviceId));
  }

  async updateServicePricing(serviceId: string, pricing: InsertServicePricing[]): Promise<ServicePricing[]> {
    await db.delete(servicePricing).where(eq(servicePricing.serviceId, serviceId));
    const results = await db.insert(servicePricing).values(
      pricing.map(p => ({ ...p, serviceId }))
    ).returning();
    return results;
  }
}

export const storage = new MemStorage();
