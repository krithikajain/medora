import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../theme/theme";

interface Props {
  children: ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing(4),
    marginVertical: spacing(2),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
});
