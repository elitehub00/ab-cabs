import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { useState } from "react";
import { SIZES } from "@/constants/Sizes";

const hisArr = [
  { name: "Home", address: "2972 Westheimer Rd." },
  { name: "Work", address: "2972 Westheimer Rd." },
  { name: "Sone", address: "2972 Westheimer Rd." },
  { name: "Shop", address: "2972 Westheimer Rd." },
  { name: "Palace", address: "2972 Westheimer Rd." },
];

export default function HomeScreen() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: Colors["light"].secondary }}>
      <Tabs.Screen
        options={{
          header: () => <CustomHeader title="Welcome Back" isHome={true}  />,
        }}
      />
      <ScrollView style={[styles.container]}>
        <Card
          mode="contained"
          contentStyle={{ paddingVertical: 12, paddingHorizontal: 0 }}
          theme={{
            colors: { surfaceVariant: Colors["light"].background },
            roundness: 4,
          }}
        >
          <Card.Title
            title="Book A Ride Now"
            titleStyle={{ fontWeight: "bold" }}
            titleVariant="titleMedium"
          />
          <Card.Content style={{ gap: 20 }}>
            <View style={styles.textbox}>
              <MaterialIcons
                name="my-location"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                From
              </Text>
            </View>
            <View style={styles.textbox}>
              <Ionicons
                name="location-outline"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                To
              </Text>
            </View>
            <View style={styles.textbox}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                Pickup Date
              </Text>
            </View>
            <View style={styles.textbox}>
              <Feather
                name="clock"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                Pickup Time
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={{ marginVertical: 24 }}>
          <Button
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ borderRadius: 8 }}
            dark
            // buttonColor={"black"}
            textColor="white"
            labelStyle={{fontSize:15}}
            contentStyle={{ height: 50 }}
          >
            Book Now
          </Button>
        </View>

        <View>
          <View style={styles.history}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              Saved Locations
            </Text>
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color="black"
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 24 }}
        >
          {hisArr.map((item, index) => (
            <View key={index} style={{ marginRight: 8 }}>
              <View style={styles.cardDefault}>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={34} color={"black"} />
                  <View>
                    <Text variant="titleMedium"> {item.name}</Text>
                    <Text variant="bodySmall"> {item.address}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    marginBottom: 0,
  },
  textbox: {
    backgroundColor: Colors["light"].secondary,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    // marginVertical:12
  },
  history: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDefault: {
    backgroundColor: Colors["light"].background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderColor: Colors["light"].accent,
    borderWidth: 1,
    borderRadius: 8,
    width: SIZES.width * 0.5,
    height: 80,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
});
