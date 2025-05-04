import NoScaleText from "@/components/ui/CustomText";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { useAuth } from "@/context/ctx";
import {
  GoogleSignin,
  // GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function Login() {
  const { login } = useAuth();
  GoogleSignin.configure({
    // scopes: ["https://www.googleapis.com/auth/drive"],
    webClientId:
      "378744098867-7o9qdm0t38lvkc598caioh26jbpmtsao.apps.googleusercontent.com",
    iosClientId:
      "378744098867-1ea1qcrc3164io5d1suvapicctrb7uav.apps.googleusercontent.com",
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginCom}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.img}
        />

        <NoScaleText variant="headlineLarge" style={styles.text}>
          Login to Continue
        </NoScaleText>

        <Button
          icon="google"
          mode="outlined"
          labelStyle={{ textAlign: "center", color: "black" }}
          contentStyle={{ height: 48, width: "100%", padding: 0 }}
          style={{ borderRadius: 8 }}
          theme={{
            colors: {
              primary: Colors["light"].text,
              outline: Colors["light"].text,
            },
            roundness: 0,
          }}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              if (userInfo.data?.idToken) {
                await login(userInfo.data?.idToken);
                router.replace("/");
              } else {
                throw new Error("no ID token present!");
              }
            } catch (error: any) {
              console.log(error);
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
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
    backgroundColor: "white",
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
    color: "black",
    marginBottom: SIZES.height * 0.05,
  },
});
