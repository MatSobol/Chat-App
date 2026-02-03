import { Sizes } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export const Card = ({
  children,
  direction = "row",
}: {
  children: ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
}) => {
  return (
    <View style={[styles.card, { flexDirection: direction }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.borderRadius,
    borderWidth: 0,
    borderColor: "#515558ff",
    backgroundColor: "#242424be",
    paddingInline: 18,
    paddingBlock: 10,
  },
});
