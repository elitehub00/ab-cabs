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
          labelStyle={{ textAlign: "center",color:"black" }}
          contentStyle={{ height: 48,width:"100%",padding:0 }}
          style={{ borderRadius: 8}}
          theme={{
            colors: {
              primary: Colors["light"].text,
              outline: Colors["light"].text,
            },
            roundness:0
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
    margin: SIZES.width * 0.05,
  },
  loginCom: {
    marginTop: SIZES.height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: SIZES.width * 0.7,
    // height: 127,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    color:"black",
    marginBottom: SIZES.height * 0.05,
  },
});
