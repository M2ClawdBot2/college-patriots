import { getChatGPTUser, requireChatGPTUser } from "./chatgpt-auth";

const EDITOR_EMAIL_HASHES = new Set([
  "1767222cc54c4a075121b76f7b95599e71fc5a1b3f57315222868528d157cb82",
]);

async function emailHash(email: string) {
  const bytes = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}

export async function requireEditor() {
  const user = await requireChatGPTUser("/studio");
  return EDITOR_EMAIL_HASHES.has(await emailHash(user.email)) ? user : null;
}

export async function getEditor() {
  const user = await getChatGPTUser();
  if (!user) return null;
  return EDITOR_EMAIL_HASHES.has(await emailHash(user.email)) ? user : null;
}
