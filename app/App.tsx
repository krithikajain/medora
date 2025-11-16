// App.tsx
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/state/AuthContext";

import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { ProfileSetupScreen } from "./src/screens/ProfileSetupScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { PrivacyScreen } from "./src/screens/PrivacyScreen";
import PrescriptionUploadScreen from "./src/screens/PrescriptionUploadScreen";
import MedicationReviewScreen from "./src/screens/MedicationReviewScreen";
import ScheduleGenerationScreen from "./src/screens/ScheduleGenerationScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  ProfileSetup: undefined;
  Home: undefined;
  Privacy: undefined;
  PrescriptionUpload: undefined;
  MedicationReview: { medicines?: any } | undefined;
  ScheduleGeneration: { medicines?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          {/* Stage 0 / 1: onboarding + auth + routine */}
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Sign in" }}
          />
          <Stack.Screen
            name="ProfileSetup"
            component={ProfileSetupScreen}
            options={{ title: "Your Daily Routine" }}
          />

          {/* Stage 2: home + prescription flow */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Medora" }}
          />
          <Stack.Screen
            name="PrescriptionUpload"
            component={PrescriptionUploadScreen}
            options={{ title: "Add Prescription" }}
          />
          <Stack.Screen
            name="MedicationReview"
            component={MedicationReviewScreen}
            options={{ title: "Review Prescription" }}
          />

          {/* Stage 3: schedule generation */}
          <Stack.Screen
            name="ScheduleGeneration"
            component={ScheduleGenerationScreen}
            options={{ title: "Schedule" }}
          />

          {/* Info */}
          <Stack.Screen
            name="Privacy"
            component={PrivacyScreen}
            options={{ title: "Privacy" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
