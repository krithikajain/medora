import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet } from "react-native";
import { colors, spacing } from "../theme/theme";

interface Props {
  children: ReactNode;
  scroll?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({ children, scroll = true }) => {
  const Content = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Content
        style={styles.content}
        contentContainerStyle={scroll ? styles.contentContainer : undefined}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing(5),
    paddingTop: spacing(4),
    paddingBottom: spacing(6),
  },
});
