import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ label, onPress, loading }) => {
  return (
    <Pressable
      onPress={loading ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing(4),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing(2),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    ...typography.subtitle,
    color: "#FFFFFF",
  },
});
