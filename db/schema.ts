import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  school: text("school").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("draft"),
  channel: text("channel").notNull().default("site"),
  body: text("body").notNull().default(""),
  views: integer("views").notNull().default(0),
  readTime: integer("read_time").notNull().default(5),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull(),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  articleId: integer("article_id"),
  kind: text("kind").notNull(),
  source: text("source").notNull(),
  createdAt: text("created_at").notNull(),
});
