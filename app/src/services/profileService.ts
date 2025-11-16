// app/src/services/profileService.ts

import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export type UserProfile = {
  name: string;
  age: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  wakeTime: string;
  sleepTime: string;
  createdAt: string;
};

export async function saveUserProfile(userId: string, profile: UserProfile) {
  const ref = doc(db, "users", userId, "meta", "profile");
  await setDoc(ref, profile, { merge: true });
}
