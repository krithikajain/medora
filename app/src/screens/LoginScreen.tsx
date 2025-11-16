// app/src/screens/LoginScreen.tsx

import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { Title, Body } from "../components/Typography";
import { useAuth } from "../state/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { OnboardingScreen } from "./OnboardingScreen";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        Alert.alert("Missing info", "Please enter email and password.");
        return;
      }

      try {
        await login(email, password);
      } catch {
        // If user doesn't exist, sign them up automatically
        await signup(email, password);
      }

      navigation.navigate("ProfileSetup" as never);
    } catch (err) {
      Alert.alert("Login failed", String(err));
    }
  };

  return (
    <ScreenContainer>
      <Title>Sign in to continue</Title>
      <Body>Email + password for now (fastest MVP)</Body>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        style={{ padding: 12, backgroundColor: "#eee", borderRadius: 8, marginVertical: 12 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{ padding: 12, backgroundColor: "#eee", borderRadius: 8, marginBottom: 20 }}
      />

      <PrimaryButton label="Continue" onPress={handleContinue} />
    </ScreenContainer>
  );
};

export default LoginScreen;
