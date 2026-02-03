import { Platform } from "react-native";

export const Colors = {
  text: "#dbdbdbff",
  textDarker: "#6a737cff",
  backgroundLighter: "#1b1b1bff",
  background: "#181818ff",
  primary: "#2f9e44",
  secondary: "#0a96afff",
  danger: "#dc3545"
};

export const Sizes = {
  borderRadius: 8,
}

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
