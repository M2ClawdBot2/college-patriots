import { ensureDb } from "../../../db";
import { getEditor } from "../../editor-auth";

const seed = [
  ["The speech code nobody voted for", "University of Michigan", "Campus life", "published", "site,x", 18420, 8],
  ["$2.4M for an office students can't name", "UCLA", "Investigation", "published", "site,x", 12708, 11],
  ["The debate that almost didn't happen", "Georgetown", "Video", "published", "site,youtube,instagram", 9682, 7],
  ["The mandatory workshop with optional truth", "Arizona State", "Field notes", "review", "site", 0, 5],
  ["Read the memo they hoped you'd ignore", "Cornell", "Documents", "draft", "site", 0, 9],
];

export async function GET() {
  const db = await ensureDb();
  const count = await db.prepare("SELECT COUNT(*) AS n FROM articles").first<{n:number}>();
  if (!count?.n) {
    const now = new Date().toISOString();
    await db.batch(seed.map((a, i) => db.prepare("INSERT INTO articles (title, school, category, status, channel, body, views, read_time, published_at, created_at) VALUES (?, ?, ?, ?, ?, '', ?, ?, ?, ?)").bind(...a, i < 3 ? now : null, now)));
  }
  const rows = await db.prepare("SELECT * FROM articles ORDER BY created_at DESC, id DESC").all();
  return Response.json(rows.results);
}

export async function POST(request: Request) {
  if (!await getEditor()) return Response.json({error:"Editorial access required"},{status:403});
  const data = await request.json() as {title?:string;school?:string;category?:string;body?:string;status?:string;channel?:string};
  if (!data.title?.trim() || !data.school?.trim()) return Response.json({error:"Title and school are required"},{status:400});
  const db = await ensureDb(); const now = new Date().toISOString();
  const result = await db.prepare("INSERT INTO articles (title, school, category, status, channel, body, views, read_time, published_at, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, 5, ?, ?)").bind(data.title.trim(), data.school.trim(), data.category || "Campus life", data.status || "draft", data.channel || "site", data.body || "", data.status === "published" ? now : null, now).run();
  return Response.json({ok:true,id:result.meta.last_row_id},{status:201});
}
