import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { colors, typography } from "../theme/theme";

export const Title: React.FC<TextProps> = ({ children, style, ...rest }) => (
  <Text style={[typography.title, { color: colors.text }, style]} {...rest}>
    {children}
  </Text>
);

export const Subtitle: React.FC<TextProps> = ({ children, style, ...rest }) => (
  <Text style={[typography.subtitle, { color: colors.text }, style]} {...rest}>
    {children}
  </Text>
);

export const Body: React.FC<TextProps> = ({ children, style, ...rest }) => (
  <Text style={[typography.body, { color: colors.textMuted }, style]} {...rest}>
    {children}
  </Text>
);
