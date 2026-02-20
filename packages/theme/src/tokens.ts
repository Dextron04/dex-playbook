export const colors = {
  dark: "#0B0018",
  darkDeep: "#080012",
  darkCard: "#120020",
  darkElevated: "#1A0533",
  lightPurple: "#F8F7FF",
  grayCard: "#F4F4F5",
  nearBlack: "#18181B",
  muted: "#6B7280",
  secondary: "#71717A",
  subtle: "#52525B",
  purple: "#8B5CF6",
  purpleLight: "#A78BFA",
  teal: "#14B8A6",
  pink: "#F472B6",
} as const;

export type ColorKey = keyof typeof colors;
