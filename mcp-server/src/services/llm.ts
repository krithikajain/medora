// mcp-server/src/services/llm.ts
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyB8lfE8TpFcCN2AoXE7Js3g7gqrLR6YDs0";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function runGeminiVision(base64Image: string, prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg",
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  return response.text || "";
}
