import { View, StyleSheet, Pressable, Image } from "react-native";
import { Avatar, Text, Button } from "react-native-paper";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Menu() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="My Settings" isHome={false} isMenu={true} />
          ),
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.profile}>
          <Avatar.Image
            size={80}
            source={require("@/assets/images/account.png")}
          />
          <View>
            <Text variant="labelMedium">Ricard Steven G.</Text>
            <Text variant="bodyMedium">richarsteven90@gmail.com</Text>
            <Text variant="bodyMedium">Washington D.C, USA</Text>
          </View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="info" size={32} color="black" />
                <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
                  About Us
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </View>
          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="globe" size={32} color="black" />
                <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
                  Our Website
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </View>
          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="star" size={32} color="black" />
                <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
                  Refer a friend / Redeem invitation code
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </View>
          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Feather name="help-circle" size={32} color="black" />
                <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
                  Help and Support
                </Text>
              </View>
              <Pressable onPress={() => {}} style={styles.button}>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
              {/* <IconButton icon="chevron-right" size={24} iconColor={"black"} /> */}
            </View>
          </View>
        </View>

        <View style={styles.promotion}>
          <Image
            source={require("@/assets/images/promotion.png")}
            style={{ width: "100%", overflow: "hidden" }}
          />
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
        >
          Log Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    padding: 24,
    backgroundColor: "rgba(8, 135, 252, 0.1)",
    borderRadius: 8,
    marginTop: 24,
  },
  menu: {
    marginTop: 24,
    gap: 16,
  },
  menuCard: {
    padding: 12,
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
  },
  promotion: {
    marginVertical: 24,
    borderRadius: 8,
  },
});
