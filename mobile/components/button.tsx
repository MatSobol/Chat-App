import { Colors, Sizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { CustomText } from "./text";

type ButtonType = "primary" | "secondary" | "danger";

export const Button = ({
  type = "primary",
  icon = "",
  text,
  size = 24,
  onClick = () => {},
}: {
  type?: ButtonType;
  icon?: string;
  text: string;
  size?: number
  onClick?: () => void;
}) => {
  return (
    <Pressable style={[styles.button, styles[type]]} onTouchEnd={onClick}>
      {icon && <Ionicons name={icon} size={size} color={Colors.text} />}
      <CustomText fontSize={size} text={text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    borderRadius: Sizes.borderRadius,
    width: "100%",
    paddingInline: 16,
    paddingBlock: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.secondary },
  danger: { backgroundColor: Colors.danger },
  text: { color: Colors.text, fontSize: 16 },
});
