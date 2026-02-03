import { Colors, Fonts } from "@/constants/theme";
import { Text } from "react-native";

export const CustomText = ({
  fontSize = 16,
  color = Colors.text,
  text,
}: {
  fontSize?: number;
  color?: string;
  text: string;
}) => {
  return (
    <Text style={{ fontSize: fontSize, fontFamily: Fonts.rounded, color: color }}>
      {text}
    </Text>
  );
};
