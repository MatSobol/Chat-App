import { Button } from "@/components/button";
import { CustomText } from "@/components/text";
import { CustomTextInput } from "@/components/textInput";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/authProvider";
import { Checkbox } from "expo-checkbox";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(false);

  const { setToken } = useContext(AuthContext);

  const isValid = () => {
    let iscorrect = true;
    if (password.length < 4) {
      setPasswordError("Password must be at least 4 long");
      iscorrect = false;
    }
    if (!email.includes("@")) {
      setEmailError("Incorrect email");
      iscorrect = false;
    }
    return iscorrect;
  };

  const login = () => {
    setEmailError("");
    setPasswordError("");
    if (isValid()) {
      Toast.show({
        type: "customSuccess",
        text1: "Login successful"
      });
      setEmail("");
      setPassword("");
      setToken("token");
      router.navigate("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <CustomText text="Sign in" fontSize={32} />
      </View>

      <CustomTextInput
        label="Email"
        value={email}
        onChangeHandle={(text) => setEmail(text)}
        icon="mail-outline"
        error={emailError}
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeHandle={(text) => setPassword(text)}
        isSecret={true}
        icon="lock-closed-outline"
        error={passwordError}
      />

      <View style={styles.extraOptionContainer}>
        <View style={styles.rememberMeContainer}>
          <Checkbox
            value={remember}
            onValueChange={setRemember}
            color={remember ? Colors.primary : Colors.text}
          />
          <CustomText text="Remember me" color={Colors.text} />
        </View>
        <Button text="Login" onClick={login} />

        <View style={styles.registerLinkContainer}>
          <CustomText
            text="Don't have an account? "
            color={Colors.textDarker}
          />
          <Link
            style={{ color: Colors.secondary, fontSize: 16 }}
            href="/register"
          >
            Click here
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "30%",
    marginInlineStart: "15%",
    width: "70%",
    display: "flex",
  },
  extraOptionContainer: {
    display: "flex",
    gap: 16,
  },
  welcomeText: {
    paddingBottom: 12,
    alignSelf: "center",
  },
  registerLinkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeContainer: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    paddingBlockStart: 4,
    gap: 8,
  },
  loginButtonContainer: {
    width: "60%",
  },
});
