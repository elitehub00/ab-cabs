import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { StyleSheet, Image, View } from "react-native";
import { Avatar, TextInput, Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CustomHeader } from "@/components/ui/CustomHeader";

export default function Account() {
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          header: () => <CustomHeader title="Your Account" isHome={false} isMenu={false} />,
        }}
      />
      <Image
        source={require("@/assets/images/banner.png")}
        style={{
          width: "100%",
          height: SIZES.height * 0.18,
          resizeMode: "cover",
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.avtar}>
          <View style={{ position: "relative" }}>
            <Avatar.Image
              size={SIZES.width * 0.3}
              source={require("@/assets/images/account.png")}
              style={{
                borderColor: Colors["light"].primary,
                // position: "relative",
              }}
            />
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={12}
                color="black"
              />
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <View>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Name
            </Text>

            <TextInput
              mode="flat"
              label=""
              value="Ricard Steven"
              theme={{
                colors: { surfaceVariant: Colors["light"].background },
                roundness: 8,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
              right={
                <TextInput.Icon
                  icon="account-outline"
                  size={16}
                  style={{
                    backgroundColor: Colors["light"].secondary,
                    borderRadius: 8,
                  }}
                />
              }
            />
          </View>

          <View>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Phone number
            </Text>

            <TextInput
              mode="flat"
              label=""
              value="+1234567890"
              theme={{
                colors: { surfaceVariant: Colors["light"].background },
                roundness: 8,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
              right={
                <TextInput.Icon
                  icon="eye"
                  size={16}
                  style={{
                    backgroundColor: Colors["light"].secondary,
                    borderRadius: 8,
                  }}
                />
              }
            />
          </View>

          <View>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Email
            </Text>

            <TextInput
              mode="flat"
              label=""
              value="ricardsteven90@gmail.com"
              theme={{
                colors: { surfaceVariant: Colors["light"].background },
                roundness: 8,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
              right={
                <TextInput.Icon
                  icon="email-outline"
                  size={16}
                  style={{
                    backgroundColor: Colors["light"].secondary,
                    borderRadius: 8,
                  }}
                />
              }
            />
          </View>

          <Button
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ borderRadius: 8, marginTop: 16 }}
            dark
            // buttonColor={"black"}
            textColor="white"
            contentStyle={{ height: 50 }}
          >
            Save
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["light"].secondary,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  avtar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
    marginBottom: 24,
    position: "relative",
  },
  form: {
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: Colors["light"].primary,
    borderWidth: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
