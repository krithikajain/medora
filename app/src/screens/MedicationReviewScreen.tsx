// app/src/screens/MedicationReviewScreen.tsx

import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { spacing } from "../theme/theme";
import { Card } from "../components/Card";
import { PrescriptionInfo } from "../types";

export default function MedicationReviewScreen({ route, navigation }) {
  const medicines: PrescriptionInfo[] = route?.params?.medicines || [];

  const handleConfirm = () => {
    // ✅ Instead of going back to Home, go to Stage 3
    navigation.navigate("ScheduleGeneration", { medicines });
  };

  const handleTryAgain = () => {
    navigation.navigate("PrescriptionUpload");
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <Title>Review Prescription</Title>
        <Body>Please confirm the extracted medication details.</Body>

        {medicines.map((med, index) => (
          <View key={index} style={styles.card}>
            <Card>
              <Text style={styles.header}>Medicine #{index + 1}</Text>

              <Text style={styles.row}>
                <Text style={styles.label}>Name: </Text>
                {med.medicineName || "N/A"}
              </Text>

              <Text style={styles.row}>
                <Text style={styles.label}>Dosage: </Text>
                {med.dosage || "N/A"}
              </Text>

              <Text style={styles.row}>
                <Text style={styles.label}>Frequency: </Text>
                {med.frequency || "N/A"}
              </Text>

              <Text style={styles.row}>
                <Text style={styles.label}>Duration: </Text>
                {med.duration || "N/A"}
              </Text>

              <Text style={styles.row}>
                <Text style={styles.label}>Notes: </Text>
                {med.notes || "N/A"}
              </Text>
            </Card>
          </View>
        ))}

        <PrimaryButton label="Confirm & Continue" onPress={handleConfirm} />
        <View style={{ marginTop: spacing(2) }}>
          <PrimaryButton label="Try Again" onPress={handleTryAgain} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing(3),
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: spacing(1),
  },
  row: {
    fontSize: 16,
    paddingVertical: 4,
  },
  label: {
    fontWeight: "bold",
  },
});
