import { View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { router, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { SIZES } from "@/constants/Sizes";
import { useAuth } from "@/context/ctx";
import NoScaleText from "@/components/ui/CustomText";

export default function Menu() {
  const { user, logout } = useAuth();
  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="My Settings" isHome={false} isMenu={true} />
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}
      >
        <View style={styles.profile}>
          <Avatar.Image
            size={80}
            source={
              user?.avatar_url
                ? { uri: user.avatar_url }
                : require("@/assets/images/account.png")
            }
          />
          <View>
            <NoScaleText variant="labelMedium">{user?.full_name}</NoScaleText>
            <NoScaleText variant="bodyMedium">{user?.email}</NoScaleText>
            <NoScaleText variant="bodyMedium">{user?.mobile}</NoScaleText>
          </View>
        </View>
        <View style={styles.menu}>
          <Pressable
            onPress={() => {
              router.push("/(app)/(menu)/about");
            }}
            style={styles.menuCard}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="info" size={32} color="black" />
                <NoScaleText variant="labelMedium" style={styles.menuText}>
                  About Us
                </NoScaleText>
              </View>
              <Pressable
                onPress={() => {
                  router.push("/(app)/(menu)/about");
                }}
                style={styles.button}
              >
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(app)/(menu)/about");
            }}
            style={styles.menuCard}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="globe" size={32} color="black" />
                <NoScaleText variant="labelMedium" style={styles.menuText}>
                  Our Website
                </NoScaleText>
              </View>
              <Pressable
                onPress={() => {
                  openLink("https://abcabs.ca");
                }}
                style={styles.button}
              >
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </Pressable>
          {/* <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="star" size={32} color="black" />
                <Text variant="labelMedium" style={styles.menuText}>
                  Refer a friend / Redeem invitation code
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
            </View>
          </View> */}
          {/* <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="help-circle" size={32} color="black" />
                <Text variant="labelMedium" style={styles.menuText}>
                  Help and Support
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
            </View>
          </View> */}
          <Pressable
            onPress={() => {
              router.push("/(app)/(menu)/about");
            }}
            style={styles.menuCard}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="youtube" size={32} color="black" />
                <NoScaleText variant="labelMedium" style={styles.menuText}>
                  Youtube
                </NoScaleText>
              </View>
              <Pressable
                onPress={() => {
                  openLink("https://www.youtube.com/@abcabs-2024");
                }}
                style={styles.button}
              >
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(app)/(menu)/about");
            }}
            style={styles.menuCard}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="facebook" size={32} color="black" />
                <NoScaleText variant="labelMedium" style={styles.menuText}>
                  Facebook
                </NoScaleText>
              </View>
              <Pressable
                onPress={() => {
                  openLink(
                    "https://www.facebook.com/profile.php?id=61566862439428&mibextid=ZbWKwL"
                  );
                }}
                style={styles.button}
              >
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(app)/(menu)/about");
            }}
            style={styles.menuCard}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <MaterialIcons name="tiktok" size={32} color="black" />
                <NoScaleText variant="labelMedium" style={styles.menuText}>
                  TikTok
                </NoScaleText>
              </View>
              <Pressable
                onPress={() => {
                  openLink(
                    "https://www.tiktok.com/@ab_cabs_/video/7435130896346320183?_t=8rVzswQRyIq&_r=1"
                  );
                }}
                style={styles.button}
              >
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </Pressable>
        </View>

        <View style={styles.promotion}>
          {/* <Image
            source={require("@/assets/images/promotion.png")}
            style={{ width: "100%", overflow: "hidden" }}
          /> */}
        </View>

        <Button
          mode="contained"
          theme={{ roundness: 0 }}
          style={{ borderRadius: 8 }}
          icon={"logout"}
          dark
          buttonColor={"#EB5757"}
          textColor="white"
          labelStyle={{ fontSize: 15 }}
          contentStyle={{
            height: 50,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
          onPress={logout}
        >
          Log Out
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: SIZES.width * 0.05,
    marginVertical: SIZES.width * 0.05,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SIZES.width * 0.03,
    padding: SIZES.width * 0.05,
    backgroundColor: "rgba(8, 135, 252, 0.1)",
    borderRadius: 8,
    marginTop: SIZES.width * 0.05,
  },
  menu: {
    marginTop: SIZES.width * 0.05,
    gap: SIZES.width * 0.03,
  },
  menuCard: {
    padding: SIZES.width * 0.03,
    borderRadius: 8,
    backgroundColor: Colors["light"].background,
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 8,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    flex: 1, // Ensures the left content takes available space
  },
  menuText: {
    flexWrap: "wrap", // Wrap text to the next line if necessary
    maxWidth: "80%", // Limit the text width to 80% of the container
    flexShrink: 1, // Allow text to shrink if needed
    fontWeight: "bold",
  },
  button: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: Colors["light"].secondary,
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 8,
    // marginVertical: SIZES.width * 0.05,
  },
  promotion: {
    marginVertical: SIZES.width * 0.05,
    borderRadius: 8,
  },
});
