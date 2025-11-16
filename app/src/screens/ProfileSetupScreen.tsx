// app/src/screens/ProfileSetupScreen.tsx
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors, spacing } from "../theme/theme";

import { saveUserProfile } from "../services/profileService";
import { useAuth } from "../state/AuthContext";
import { OnboardingScreen } from "./OnboardingScreen";

export const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!user) {
      Alert.alert("Error", "No user found. Please restart the app.");
      return;
    }

    // Basic sanity validation – you can tighten this later
    if (
      !name.trim() ||
      !age.trim() ||
      !breakfast.trim() ||
      !lunch.trim() ||
      !dinner.trim() ||
      !wakeTime.trim() ||
      !sleepTime.trim()
    ) {
      Alert.alert("Missing information", "Please fill out all fields to continue.");
      return;
    }

    const profile = {
      name: name.trim(),
      age: age.trim(),
      breakfast: breakfast.trim(),
      lunch: lunch.trim(),
      dinner: dinner.trim(),
      wakeTime: wakeTime.trim(),
      sleepTime: sleepTime.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      setSaving(true);
      await saveUserProfile(user.uid, profile);

      // Only navigate if save succeeded
      navigation.navigate("Home" as never);
    } catch (err) {
      console.error("Error saving profile:", err);
      Alert.alert(
        "Error",
        "Failed to save your profile. Please check your connection and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenContainer>
      <Title>Tell me about your schedule</Title>
      <Body>I'll use this to create medication reminders that fit your day.</Body>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Breakfast time (e.g. 08:00)"
          value={breakfast}
          onChangeText={setBreakfast}
          style={styles.input}
        />

        <TextInput
          placeholder="Lunch time (e.g. 13:00)"
          value={lunch}
          onChangeText={setLunch}
          style={styles.input}
        />

        <TextInput
          placeholder="Dinner time (e.g. 19:00)"
          value={dinner}
          onChangeText={setDinner}
          style={styles.input}
        />

        <TextInput
          placeholder="Wake time (e.g. 07:00)"
          value={wakeTime}
          onChangeText={setWakeTime}
          style={styles.input}
        />

        <TextInput
          placeholder="Sleep time (e.g. 23:00)"
          value={sleepTime}
          onChangeText={setSleepTime}
          style={styles.input}
        />
      </View>

      <PrimaryButton label={saving ? "Saving..." : "Continue"} onPress={handleContinue} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: spacing(4),
    gap: spacing(3),
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing(3),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default ProfileSetupScreen;