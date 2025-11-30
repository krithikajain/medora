// mcp-server/src/services/json.ts
export function extractJson(raw: string): any {
  if (!raw) throw new Error("Empty AI response");

  raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch {}

  const match = raw.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  throw new Error("Gemini returned invalid JSON");
}
