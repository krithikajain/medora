import { StyleSheet } from "react-native";
import { spacing } from "./theme";

export const sharedStyles = StyleSheet.create({
  cardLabel: {
    fontWeight: "bold",
  },
  cardRow: {
    fontSize: 16,
    paddingVertical: spacing(1),
  },
});
