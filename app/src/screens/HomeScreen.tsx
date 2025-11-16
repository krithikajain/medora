// app/src/screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { spacing } from "../theme/theme";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Title>Welcome to Medora</Title>
      <Body>Your medication assistant is ready.</Body>

      <View style={styles.buttons}>
        <PrimaryButton
          label="➕ Add Prescription"
          onPress={() => navigation.navigate("PrescriptionUpload" as never)}
        />

        <PrimaryButton
          label="🔒 How we keep your data private"
          onPress={() => navigation.navigate("Privacy" as never)}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: spacing(6),
    gap: spacing(4),
  },
});

export default HomeScreen;
