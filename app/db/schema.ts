import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const memosTable = pgTable("memos_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export type InsertPost = typeof memosTable.$inferInsert;
export type SelectPost = typeof memosTable.$inferSelect;
