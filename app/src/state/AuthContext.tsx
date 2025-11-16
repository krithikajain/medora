// app/src/state/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { Platform } from "react-native";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //
  // 👉 1. Handle Expo Web login separately (no Firebase here)
  //
  useEffect(() => {
    if (Platform.OS === "web") {
      // Auto-log in as a local user
      const webUser = { uid: "web-user", email: "web@local.dev" } as User;
      setUser(webUser);
      setLoading(false);
      return;
    }
  }, []);

  //
  // 👉 2. Mobile (iOS/Android) use real Firebase Auth
  //
  useEffect(() => {
    if (Platform.OS === "web") return; // skip for web

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    return unsub;
  }, []);

  //
  // 👉 3. Login
  //
  const login = async (email: string, password: string) => {
    if (Platform.OS === "web") {
      setUser({ uid: "web-user", email } as User);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  //
  // 👉 4. Signup
  //
  const signup = async (email: string, password: string) => {
    if (Platform.OS === "web") {
      setUser({ uid: "web-user", email } as User);
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  //
  // 👉 5. Logout
  //
  const logout = async () => {
    if (Platform.OS === "web") {
      setUser(null);
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
