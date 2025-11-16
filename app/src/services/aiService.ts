// app/src/services/aiService.ts
import { GoogleGenAI } from "@google/genai";
import { PrescriptionInfo } from "../types";

const API_KEY = "AIzaSyB8lfE8TpFcCN2AoXE7Js3g7gqrLR6YDs0";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

// -------------------------------------------------------
// Cross-platform Base64 Converter (Web + iOS + Android)
// -------------------------------------------------------
async function toBase64Part(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = reject;

    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];

      resolve({
        inlineData: {
          data: base64,
          mimeType: blob.type || "image/jpeg",
        },
      });
    };

    reader.readAsDataURL(blob);
  });
}

// -------------------------------------------------------
// Universal JSON Extractor — handles ALL Gemini formats
// -------------------------------------------------------
function extractJson(raw: string): any {
  // 1. Strip markdown backticks
  raw = raw.replace(/```json/gi, "")
           .replace(/```/g, "")
           .trim();

  // 2. Try direct JSON parse
  try {
    return JSON.parse(raw);
  } catch {}

  // 3. Try extracting array-level JSON
  const arrayMatch = raw.match(/\[\s*[\s\S]*?\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]);
    } catch {}
  }

  // 4. Try object-level JSON
  const objMatch = raw.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try {
      return JSON.parse(objMatch[0]);
    } catch {}
  }

  throw new Error("AI returned invalid or unparsable JSON");
}

// -------------------------------------------------------
// Main AI Extraction Function
// -------------------------------------------------------
export async function analyzePrescription(
  imageUri: string
): Promise<PrescriptionInfo> {
  const prompt = `
You are a medical prescription parser. You MUST extract medications into JSON.

Return JSON ONLY. No text.

Each medication must follow this structure:

{
  "medicineName": "",
  "dosage": "",
  "frequency": "",
  "duration": "",
  "notes": ""
}

If multiple medicines exist, return an ARRAY of objects.

If unreadable, return:
{ "error": "Prescription unreadable or invalid." }
`;

  try {
    const imagePart = await toBase64Part(imageUri);

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            imagePart
          ]
        }
      ]
    });

    // Correct field for your SDK
    let raw = result.text ?? "";
    console.log("AI RAW OUTPUT:", raw);

    // Extract JSON using our bulletproof extractor
    const parsed = extractJson(raw);

    return parsed;
  } catch (error) {
    console.error("❌ Prescription parsing failed:", error);

    return {
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
      error: "Failed to process image",
    };
  }
}
