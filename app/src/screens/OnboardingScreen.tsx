// app/src/screens/OnboardingScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { Card } from "../components/Card";
import { colors, spacing } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <View style={styles.circle} />
        <Title style={styles.title}>Your smart medication companion</Title>
        <Body>
          Gentle reminders, clear schedules, and simple tracking to help you stay on top of your meds.
        </Body>
      </View>

      <Card>
        <Body>What I can help you with:</Body>
        <Body>
          • Read prescriptions from photos{"\n"}
          • Create medication schedules around your day{"\n"}
          • Remind you gently and track your progress
        </Body>
      </Card>

      <View style={styles.bottom}>
        <PrimaryButton label="Get started" onPress={handleGetStarted} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  top: {
    marginTop: spacing(6),
    marginBottom: spacing(4),
    alignItems: "flex-start",
    gap: spacing(3),
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySoft,
    alignSelf: "center",
    marginBottom: spacing(4),
  },
  title: {
    marginBottom: spacing(1),
  },
  bottom: {
    marginTop: "auto",
  },
});

export default OnboardingScreen;
