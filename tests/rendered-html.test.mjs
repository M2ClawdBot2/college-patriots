import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("publication ships its finished identity and editorial sections", async () => {
  const [page, layout, css] = await Promise.all([
    read("app/page.tsx"), read("app/layout.tsx"), read("app/globals.css"),
  ]);
  assert.match(layout, /College Patriots — The Campus Record, Unfiltered/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.match(page, /THE CAMPUS/);
  assert.match(page, /FIELD<br\/>DISPATCHES/);
  assert.match(page, /POLICY OR PARODY/);
  assert.match(page, /University of Florida/);
  assert.match(page, /AMERICA FIRST/);
  assert.match(page, /oppose mass immigration and illegal immigration/);
  assert.match(page, /jordan-conradson-newsprint\.png/);
  assert.match(page, /JORDAN/);
  assert.match(page, /CONRADSON/);
  assert.match(page, /https:\/\/x\.com\/ConradsonJordan/);
  assert.match(css, /\.editorial\{/);
  assert.match(css, /@media\(max-width:800px\)/);
});

test("editorial studio and persistent article API are connected", async () => {
  const [studio, route, db, hosting] = await Promise.all([
    read("app/studio/studio.tsx"), read("app/api/articles/route.ts"),
    read("db/index.ts"), read(".openai/hosting.json"),
  ]);
  assert.match(studio, /fetch\("\/api\/articles"/);
  assert.match(studio, /method:"POST"/);
  assert.match(studio, /MANAGING EDITOR/);
  assert.match(route, /export async function GET/);
  assert.match(route, /export async function POST/);
  assert.match(route, /INSERT INTO articles/);
  assert.match(db, /CREATE TABLE IF NOT EXISTS articles/);
  assert.match(db, /CREATE INDEX IF NOT EXISTS idx_articles_status_created/);
  assert.match(hosting, /"d1": "DB"/);
});
