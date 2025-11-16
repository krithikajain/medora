// app/src/screens/ScheduleGenerationScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { spacing } from "../theme/theme";
import { Card } from "../components/Card";
import { PrescriptionInfo } from "../types";

export default function ScheduleGenerationScreen({ route, navigation }) {
  const medicines: PrescriptionInfo[] = route?.params?.medicines || [];

  const handleSaveSchedule = () => {
    // TODO: Use Stage 0 data (wake/sleep/meal times) + medicines
    // TODO: Generate schedule (AI or rule-based) and save it
    navigation.navigate("Home"); // back to dashboard after saving
  };

  return (
    <ScreenContainer>
      <Title>Generate your schedule</Title>
      <Body>
        Based on your prescription and your daily routine, we’ll create a
        medication schedule.
      </Body>

      <View style={styles.list}>
        {medicines.map((med, index) => (
          <Card key={index}>
            <Body style={styles.bold}>Medicine #{index + 1}</Body>
            <Body>
              <Body style={styles.bold}>Name: </Body>
              {med.medicineName || "N/A"}
            </Body>
            <Body>
              <Body style={styles.bold}>Dosage: </Body>
              {med.dosage || "N/A"}
            </Body>
            <Body>
              <Body style={styles.bold}>Frequency: </Body>
              {med.frequency || "N/A"}
            </Body>
          </Card>
        ))}
      </View>

      {/* Later: show time slots, allow editing, etc. */}
      <View style={styles.bottom}>
        <PrimaryButton
          label="Generate & Save Schedule"
          onPress={handleSaveSchedule}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: spacing(4),
    gap: spacing(2),
  },
  bold: {
    fontWeight: "bold",
    marginBottom: spacing(1),
  },
  bottom: {
    marginTop: spacing(6),
  },
});
