import { Ionicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";

export function CustomHeader() {
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
          <Text variant="bodyMedium" style={{ color: Colors["light"].textAcc }}>
            Hi Sivarathan Sivarajah,{" "}
          </Text>
          <Text
            variant="headlineMedium"
            style={{ fontWeight: "bold", marginTop: 2 }}
          >
            Welcome Back
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
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
            name="menu-sharp"
            size={24}
            color={Colors["light"].text}
            style={{
              margin: 0,
              padding: 0,
              textAlign: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 24,
          borderRadius: 12,
          borderWidth: 1,
          padding: 12,
          borderColor: "#DEDEDE",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons
            name="menu-sharp"
            size={32}
            color={Colors["light"].text}
            style={{ marginRight: 12 }}
          />
          <View>
            <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
              Special Promo Code!!!
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: Colors["light"].textAcc }}
            >
              Use This Code For Get Discount
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: "black",
            borderRadius: 12,
            paddingVertical: 4,
            paddingHorizontal: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {}}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 11 }}>
            Get Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
