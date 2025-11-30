// mcp-server/src/tools/extractPrescription.ts
import { extractJson } from "../services/json";
import { runGeminiVision } from "../services/llm";


const PROMPT = `
You are a highly reliable medical prescription extraction system.  
Your task is to extract medication details from the provided prescription image.

Return ONLY valid JSON. No explanations. No markdown.

Extract the following fields for each medicine you find:

- "medicineName"
- "dosage"
- "frequency"
- "duration"
- "notes"

Infer duration if missing (from dates, tablet count, instructions).

Output must be:

{
  "medications": [
    {
      "medicineName": "",
      "dosage": "",
      "frequency": "",
      "duration": "",
      "notes": ""
    }
  ]
}

If nothing found:
{
  "medications": [],
  "error": "No medication found"
}
`;

export async function extractPrescription({ base64Image }: { base64Image: string }) {
  try {
    const raw = await runGeminiVision(base64Image, PROMPT);
    const json = extractJson(raw);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(json),
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            medications: [],
            error: "Failed to extract data",
          }),
        },
      ],
    };
  }
}
