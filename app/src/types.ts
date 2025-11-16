// app/src/types.ts
export interface PrescriptionInfo {
  medicineName: string | null;
  dosage: string | null;
  frequency: string | null;
  duration: string | null;
  notes: string | null;
  error?: string;
}
