import { type User, type InsertUser, type PromoStatus, users, promoStatuses } from "@shared/schema";
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
}

class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private promoStatuses: Map<string, PromoStatus> = new Map();

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
}

export const storage = new MemStorage();
