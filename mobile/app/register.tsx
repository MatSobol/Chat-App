import { Button } from "@/components/button";
import { CustomText } from "@/components/text";
import { CustomTextInput } from "@/components/textInput";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/contexts/authProvider";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setToken } = useContext(AuthContext);

  const register = () => {
    Toast.show({
      type: "customSuccess",
      text1: "Registration successful",
    });
    setToken("token");
    router.navigate("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <CustomText text="Register" fontSize={32} />
      </View>

      <CustomTextInput
        value={name}
        onChangeHandle={setName}
        label="Name"
        icon="person-outline"
        error={nameError}
      />
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

      <Button text="Register" onClick={register} />

      <View style={styles.registerLinkContainer}>
        <CustomText text="Have an account? " color={Colors.textDarker} />
        <Link style={{ color: Colors.secondary, fontSize: 16 }} href="/login">
          Click here
        </Link>
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
  welcomeText: {
    paddingBottom: 12,
    alignSelf: "center",
  },
  registerLinkContainer: {
    paddingBlockStart: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
