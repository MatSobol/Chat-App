import { Colors, Sizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomText } from "./text";

export const CustomTextInput = ({
  value,
  onChangeHandle,
  label = "",
  isSecret = false,
  icon = "",
  error = null,
}: {
  value: string;
  onChangeHandle: (e: string) => void;
  label?: string;
  icon?: string;
  isSecret?: boolean;
  error?: string | null;
}) => {
  const currentColor = error ? Colors.danger : Colors.secondary;
  const [secure, setSecure] = useState(isSecret);
  const [isFocused, setIsFocused] = useState(false);

  const left = useRef(new Animated.Value(icon ? 26 : 4)).current;
  const top = useRef(new Animated.Value(20)).current;
  const fontSize = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.timing(left, {
        toValue: 8,
        easing: Easing.cubic,
        duration: 150,
        useNativeDriver: false,
      }).start();
      Animated.timing(top, {
        toValue: 0,
        easing: Easing.cubic,
        duration: 150,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontSize, {
        toValue: 14,
        easing: Easing.cubic,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={[styles.border, error ? styles.invalid : ""]}>
        {icon && <Ionicons name={icon} size={16} color={currentColor} />}
        {label && (
          <Animated.Text
            style={{
              position: "absolute",
              paddingInline: 4,
              top: top,
              left: left,
              backgroundColor: Colors.background,
              transform: "translate(0%, -50%)",
              color: currentColor,
              fontSize: fontSize,
            }}
          >
            {label}
          </Animated.Text>
        )}
        <TextInput
          style={{
            fontSize: 16,
            color: currentColor,
            flexGrow: 1,
            flexShrink: 1,
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={secure}
          value={value}
          onChangeText={(text) => onChangeHandle(text)}
          cursorColor={currentColor}
          selectionHandleColor={currentColor}
        />
        {isSecret && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={currentColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {error !== null && <CustomText text={error} color={Colors.danger} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  border: {
    borderColor: Colors.secondary,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    paddingInline: 8,
    marginBlockStart: 4,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  invalid: {
    borderColor: Colors.danger,
    color: Colors.danger,
  },
});
