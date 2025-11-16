// app/src/screens/PrescriptionUploadScreen.tsx

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";
import { PrimaryButton } from "../components/PrimaryButton";
import { spacing } from "../theme/theme";

import { analyzePrescription } from "../services/aiService";

export default function PrescriptionUploadScreen({ navigation }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled) startAnalysis(result.assets[0].uri);
  };

  const take = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled) startAnalysis(result.assets[0].uri);
  };

  const startAnalysis = async (uri: string) => {
    setImageUri(uri);
    setLoading(true);

    try {
      const data = await analyzePrescription(uri);

      if (data.error) {
        Alert.alert("Failed", data.error);
        return;
      }

      const meds = Array.isArray(data) ? data : [data];

      navigation.navigate("MedicationReview", { medicines: meds });
    } catch (err) {
      Alert.alert("Error", "Unable to process image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Title>Add Prescription</Title>
      <Body>Upload a clear photo of your prescription.</Body>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>No image</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
            <Body style={{ color: "#fff", marginTop: 10 }}>Analyzing…</Body>
          </View>
        )}
      </View>

      {!loading && (
        <>
          <PrimaryButton label="Select from Gallery" onPress={pick} />
          <View style={{ marginTop: spacing(2) }}>
            <PrimaryButton label="Take Photo" onPress={take} />
          </View>
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: spacing(4),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  placeholder: {
    width: 280,
    height: 380,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 280,
    height: 380,
    borderRadius: 12,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

