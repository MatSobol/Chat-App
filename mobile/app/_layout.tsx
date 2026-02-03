import { CustomText } from "@/components/text";
import { Colors, Sizes } from "@/constants/theme";
import { AuthContext, AuthProvider } from "@/contexts/authProvider";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function Root() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

const toastConfig = {
  customSuccess: ({ text1 }: { text1: string }) => (
    <View style={[styles.toast, styles.succesToast]}>
      <Ionicons
        name={"checkmark-circle-outline"}
        size={24}
        color={Colors.text}
      />
      <CustomText text={text1} fontSize={24} />
    </View>
  ),

  customError: ({ text1 }: { text1: string }) => (
    <View style={[styles.toast, styles.errorToast]}>
      <Ionicons name={"close-circle-outline"} size={24} color={Colors.text} />
      <CustomText text={text1} fontSize={24} />
    </View>
  ),

  customInfo: ({ text1 }: { text1: string }) => (
    <View style={[styles.toast, styles.infoToast]}>
      <Ionicons
        name={"information-circle-outline"}
        size={24}
        color={Colors.text}
      />
      <CustomText text={text1} fontSize={24} />
    </View>
  ),
};

function RootLayout() {
  const { token, isAuthenticated } = useContext(AuthContext);

  if (token === null)
    return <View style={{ backgroundColor: Colors.background }}></View>;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Colors.background,
  },
  toast: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.borderRadius,
    paddingInline: 16,
    paddingBlock: 4,
    gap: 4,
  },
  errorToast: {
    backgroundColor: Colors.danger,
  },
  succesToast: {
    backgroundColor: Colors.primary,
  },
  infoToast: {
    backgroundColor: Colors.secondary,
  },
});
