import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  imageUrl: text("image_url"),
  available: integer("available").default(1),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  orderDetails: text("order_details").notNull(),
  status: text("status").default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
}).extend({
  customerName: z.string().min(1, "Nombre es requerido"),
  customerPhone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
  orderDetails: z.string().min(1, "Detalles del pedido son requeridos"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
