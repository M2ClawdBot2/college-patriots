import Studio from "./studio";
import { requireEditor } from "../editor-auth";
export const dynamic = "force-dynamic";
export default async function StudioPage(){
  const editor = await requireEditor();
  if (!editor) return <main className="access-denied"><span>UP / STAFF ONLY</span><h1>Editorial access required.</h1><p>This newsroom is limited to approved University Patriot editors.</p><a href="/">← RETURN TO PUBLICATION</a></main>;
  return <Studio/>;
}
