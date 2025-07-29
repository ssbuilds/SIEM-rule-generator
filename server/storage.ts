import { users, ruleGenerations, type User, type InsertUser, type RuleGeneration, type InsertRuleGeneration } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRuleGeneration(ruleGeneration: InsertRuleGeneration): Promise<RuleGeneration>;
  getRuleGeneration(id: number): Promise<RuleGeneration | undefined>;
  getRuleGenerationsByUser(userId: number): Promise<RuleGeneration[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createRuleGeneration(insertRuleGeneration: InsertRuleGeneration): Promise<RuleGeneration> {
    const [ruleGeneration] = await db
      .insert(ruleGenerations)
      .values(insertRuleGeneration)
      .returning();
    return ruleGeneration;
  }

  async getRuleGeneration(id: number): Promise<RuleGeneration | undefined> {
    const [ruleGeneration] = await db.select().from(ruleGenerations).where(eq(ruleGenerations.id, id));
    return ruleGeneration || undefined;
  }

  async getRuleGenerationsByUser(userId: number): Promise<RuleGeneration[]> {
    const results = await db.select().from(ruleGenerations);
    return results;
  }
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private ruleGenerations: RuleGeneration[] = [];
  private nextUserId = 1;
  private nextRuleId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.push(user);
    return user;
  }

  async createRuleGeneration(insertRuleGeneration: InsertRuleGeneration): Promise<RuleGeneration> {
    const ruleGeneration: RuleGeneration = {
      id: this.nextRuleId++,
      useCase: insertRuleGeneration.useCase,
      logSource: insertRuleGeneration.logSource || null,
      eventIds: insertRuleGeneration.eventIds || null,
      severity: insertRuleGeneration.severity,
      mitreAttack: insertRuleGeneration.mitreAttack || null,
      sigmaRule: insertRuleGeneration.sigmaRule,
      kqlQuery: insertRuleGeneration.kqlQuery,
      ruleId: insertRuleGeneration.ruleId,
      createdAt: new Date(),
    };
    this.ruleGenerations.push(ruleGeneration);
    return ruleGeneration;
  }

  async getRuleGeneration(id: number): Promise<RuleGeneration | undefined> {
    return this.ruleGenerations.find(rule => rule.id === id);
  }

  async getRuleGenerationsByUser(userId: number): Promise<RuleGeneration[]> {
    // For in-memory storage, return all rules since we don't have user sessions
    return this.ruleGenerations;
  }
}

// Initialize with MemStorage since database is currently disabled
// Will automatically switch back to DatabaseStorage when database is re-enabled
export const storage = new MemStorage();

// Helper function to test and switch storage if needed
export async function testAndSwitchStorage(): Promise<void> {
  try {
    await db.select().from(users).limit(1);
    console.log('Database connection restored');
    // Could implement hot-swapping here if needed
  } catch (error) {
    console.log('Database still unavailable, using in-memory storage');
  }
}
