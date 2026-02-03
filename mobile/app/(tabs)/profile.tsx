import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CustomText } from "@/components/text";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/authProvider";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const OptionElement = ({
  icon,
  text,
  value = null,
}: {
  icon: string;
  text: string;
  value?: string | null;
}) => {
  return (
    <Pressable
      style={styles.element}
      onTouchEnd={() =>
        Toast.show({ type: "customError", text1: "Not implemented" })
      }
    >
      <Ionicons name={icon} color={Colors.text} size={26} />
      <CustomText text={text} fontSize={20} />
      {value && (
        <View style={{ marginInlineStart: "auto" }}>
          <CustomText text={value} color={Colors.primary} />
        </View>
      )}
    </Pressable>
  );
};

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.containter}>
      <Ionicons name={"person-circle-outline"} color={Colors.text} size={200} />
      <CustomText text="John Smith" fontSize={32} />
      <CustomText
        text="john@gmail.com"
        fontSize={16}
        color={Colors.textDarker}
      />
      <View style={{ paddingBlock: 15, width: "100%" }}>
        <Card direction="column">
          <OptionElement icon="create-outline" text="Edit profile" />
          <View style={styles.gap}></View>
          <OptionElement
            icon="language-outline"
            text="Language"
            value="English"
          />
          <View style={styles.gap}></View>
          <OptionElement
            icon="notifications-outline"
            text="Notification"
            value="On"
          />
        </Card>
        <View style={styles.gap}></View>
        <Card direction="column">
          <OptionElement icon="lock-closed-outline" text="Security" />
          <View style={styles.gap}></View>
          <OptionElement icon="moon-outline" text="Theme" value="Dark" />
        </Card>
      </View>

      <Button text="Logout" type="danger" onClick={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    display: "flex",
    alignItems: "center",
    paddingInline: "10%",
    paddingBlockStart: 10,
  },
  gap: {
    height: 10,
  },
  biggerGap: {
    height: 20,
  },
  element: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: "100%",
    alignItems: "center",
  },
});
