import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const ruleGenerations = pgTable("rule_generations", {
  id: serial("id").primaryKey(),
  useCase: text("use_case").notNull(),
  logSource: text("log_source"),
  eventIds: text("event_ids"),
  severity: text("severity").notNull(),
  mitreAttack: text("mitre_attack"),
  sigmaRule: text("sigma_rule").notNull(),
  kqlQuery: text("kql_query").notNull(),
  ruleId: text("rule_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const generateRuleSchema = z.object({
  useCase: z.string().min(10, "Use case description must be at least 10 characters"),
  logSource: z.string().optional(),
  eventIds: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  mitreAttack: z.string().optional(),
  apiProvider: z.enum(["anthropic", "openai", "azure", "groq"]),
  apiKey: z.string().optional(),
});

export const apiConfigSchema = z.object({
  provider: z.enum(["anthropic", "openai", "azure", "groq"]),
  apiKey: z.string().min(1, "API key is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GenerateRuleRequest = z.infer<typeof generateRuleSchema>;
export type ApiConfigRequest = z.infer<typeof apiConfigSchema>;
export type RuleGeneration = typeof ruleGenerations.$inferSelect;
export type InsertRuleGeneration = typeof ruleGenerations.$inferInsert;
