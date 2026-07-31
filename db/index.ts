import { env } from "cloudflare:workers";

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, school TEXT NOT NULL, category TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', channel TEXT NOT NULL DEFAULT 'site', body TEXT NOT NULL DEFAULT '', views INTEGER NOT NULL DEFAULT 0, read_time INTEGER NOT NULL DEFAULT 5, published_at TEXT, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER, kind TEXT NOT NULL, source TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_status_created ON articles(status, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_events_article_created ON events(article_id, created_at)`,
];

export function getD1(): D1Database { if (!env.DB) throw new Error("D1 binding DB is unavailable"); return env.DB; }
export async function ensureDb() { const db = getD1(); await db.batch(schemaStatements.map(sql => db.prepare(sql))); return db; }
