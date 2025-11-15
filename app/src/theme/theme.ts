// app/src/theme/theme.ts
export const colors = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  primary: "#3B8C6E",
  primarySoft: "#E3F2EC",
  accent: "#FFC766",
  text: "#1F2933",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
};

export const spacing = (factor: number) => factor * 4;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500" as const,
  },
  body: {
    fontSize: 15,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};
