import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export async function signInWithGoogleWeb() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user; // gives uid, email, name
}
