import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { SIZES } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Login() {
  const login = async () => {
    await AsyncStorage.setItem("login", "true");

    router.replace("/(app)/(tabs)");
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginCom}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.img}
        />

        <Text variant="headlineLarge" style={styles.text}>
          Login to Continue
        </Text>

        <Button
          icon="google"
          mode="outlined"
          labelStyle={{ textAlign: "center" }}
          contentStyle={{ width: "100%", height: 48 }}
          theme={{
            colors: {
              primary: Colors["light"].text,
              outline: Colors["light"].secondary,
            },
          }}
          onPress={login}
        >
          Continue with Google
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
  loginCom: {
    marginTop: SIZES.height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    // height: 127,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    marginBottom: 48,
  },
});
