import { type User, type InsertUser, type PromoStatus } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Promo status methods
  getPromoStatus(month: number, year: number): Promise<PromoStatus | undefined>;
  createPromoStatus(month: number, year: number, slots: number): Promise<PromoStatus>;
  updatePromoSlots(month: number, year: number, slots: number): Promise<PromoStatus>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private promoStatuses: Map<string, PromoStatus>;

  constructor() {
    this.users = new Map();
    this.promoStatuses = new Map();
    
    // Initialize current month's promo with 3 slots
    const now = new Date();
    const key = `${now.getFullYear()}-${now.getMonth()}`;
    this.promoStatuses.set(key, {
      month: now.getMonth(),
      year: now.getFullYear(),
      slotsRemaining: 3,
      lastUpdated: now
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPromoStatus(month: number, year: number): Promise<PromoStatus | undefined> {
    const key = `${year}-${month}`;
    return this.promoStatuses.get(key);
  }

  async createPromoStatus(month: number, year: number, slots: number): Promise<PromoStatus> {
    const key = `${year}-${month}`;
    const status: PromoStatus = {
      month,
      year,
      slotsRemaining: slots,
      lastUpdated: new Date()
    };
    this.promoStatuses.set(key, status);
    return status;
  }

  async updatePromoSlots(month: number, year: number, slots: number): Promise<PromoStatus> {
    const key = `${year}-${month}`;
    const status: PromoStatus = {
      month,
      year,
      slotsRemaining: slots,
      lastUpdated: new Date()
    };
    this.promoStatuses.set(key, status);
    return status;
  }
}

export const storage = new MemStorage();
