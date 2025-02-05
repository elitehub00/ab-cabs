import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useAuth } from "@/context/ctx";

interface CustomHeaderProps {
  title: string;
  isHome: boolean;
  isMenu: boolean;
}

export function CustomHeader({ title, isHome, isMenu }: CustomHeaderProps) {
    const { user } = useAuth();
  const makePhoneCall = async () => {
    const phoneNumber = "+1 (403) 634 - 4373";

    if (phoneNumber !== null) {
      await Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert("Error", "Phone call is not supported on this device");
    }
  };
  return (
    <View
      style={{
        padding: 24,
        backgroundColor: Colors["light"].background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          {isHome && (
            <Text
              variant="bodyMedium"
              style={{ color: Colors["light"].textAcc }}
            >
              Hi {user?.full_name.split(" ")[0]},
            </Text>
          )}
          <Text
            variant="headlineMedium"
            style={{ fontWeight: "bold", marginTop: 2 }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            isMenu ? router.back() : router.push("/(app)/(menu)");
          }}
          style={{
            backgroundColor: Colors["light"].background,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#171717",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderWidth: 1,
            borderColor: "#E0E0E0",
            elevation: 8,
            height: 32,
            width: 32,
          }}
        >
          <Ionicons
            name={isMenu ? "arrow-back" : "menu-sharp"}
            size={isMenu ? 20 : 24}
            color={isMenu ? "black" : Colors["light"].text}
            style={{
              margin: 0,
              padding: 0,
              textAlign: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      {isHome && (
        <View
          style={{
            marginTop: 24,
            borderRadius: 12,
            backgroundColor: Colors["light"].background,
            shadowColor: "#171717",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderWidth: 1,
            borderColor: "#E0E0E0",
            elevation: 8,
            padding: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="call"
              size={32}
              color={"black"}
              style={{ marginRight: 12 }}
            />

            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", color: "black" }}
            >
              {"+1 (403) 634 - 4373"}
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: Colors.light.primary,
              borderRadius: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              makePhoneCall();
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Call Now
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
