import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer } from "drizzle-orm/pg-core";
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

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  store: text("store").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const searchHistorySchema = z.object({
  id: z.string(),
  query: z.string(),
  timestamp: z.string(),
  resultCount: z.number(),
});

export type SearchHistory = z.infer<typeof searchHistorySchema>;

export const roomVisualizationSchema = z.object({
  id: z.string(),
  originalImageUrl: z.string(),
  processedImageUrl: z.string(),
  furnitureItems: z.array(z.string()),
  timestamp: z.string(),
});

export type RoomVisualization = z.infer<typeof roomVisualizationSchema>;

export const searchRequestSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;

export const aiSummarySchema = z.object({
  summary: z.string(),
  insights: z.array(z.string()),
});

export type AISummary = z.infer<typeof aiSummarySchema>;

export const searchResponseSchema = z.object({
  query: z.string(),
  aiSummary: aiSummarySchema,
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    originalPrice: z.string().optional(),
    rating: z.number(),
    reviewCount: z.number(),
    store: z.string(),
    category: z.string(),
    imageUrl: z.string(),
  })),
});

export type SearchResponse = z.infer<typeof searchResponseSchema>;
