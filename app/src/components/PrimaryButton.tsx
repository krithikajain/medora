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
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  label: {
    ...typography.subtitle,
    color: "#FFFFFF",
  },
});
