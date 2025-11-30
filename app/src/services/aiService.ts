import { PrescriptionInfo } from "../types";
import { apiPost } from "./apiClient";

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
        data: base64,
        mimeType: blob.type || "image/jpeg",
      });
    };

    reader.readAsDataURL(blob);
  });
}

// -------------------------------------------------------
// Main AI Function (now calls your BACKEND, not Gemini)
// -------------------------------------------------------
export const aiService = {
  extractPrescription: async (imageUri: string): Promise<PrescriptionInfo> => {
    try {
      const imagePart = await toBase64Part(imageUri);

      // 🌐 call backend → backend calls MCP → MCP does AI
      const response = await apiPost("/ai/extract", {
        imageBase64: imagePart.data,
      });

      return response;
    } catch (error) {
      console.error("❌ extractPrescription failed:", error);
      return {
        error: "Failed to process image",
      } as any;
    }
  },

  normalizeInstructions: async (rawMedications: any[]) => {
    return apiPost("/ai/normalize", {
      rawMedications,
    });
  },

  generateSchedule: async (normalizedMedications: any[], userProfile: any) => {
    return apiPost("/ai/schedule", {
      normalizedMedications,
      userProfile,
    });
  },

  estimateRefillDate: async (supplyDays: number) => {
    return apiPost("/ai/refill", { supplyDays });
  },
};
