import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { Text, Card, TextInput } from "react-native-paper";
import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { useState } from "react";

const hisArr = [
  { name: "My Home", pluse: true, active: true },
  { name: "Potomac Brhdhdhdd", pluse: false, active: false },
  { name: "Navy Yardhshjd", pluse: true, active: false },
  { name: "My Columbia Rigghf", pluse: false, active: true },
  { name: "My Home", pluse: true, active: false },
];

export default function HomeScreen() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: Colors["light"].secondary }}>
      <Tabs.Screen
        options={{
          header: () => <CustomHeader />,
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
            // titleStyle={{ fontSize: 16, fontWeight: "700" }}
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

        <View style={{ marginTop: 24 }}>
          <View style={styles.history}>
            <Text variant="titleMedium">
              History Destination
            </Text>
            <Ionicons name="arrow-forward-circle" size={24} color="black" />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 24 }}
        >
          {hisArr.map((item, index) => (
            <View key={index} style={{ marginRight: 8 }}>
              <View style={{ position: "relative" }}>
                <View
                  style={item.active ? styles.cardActive : styles.cardDefault}
                >
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={
                      item.active
                        ? Colors["light"].background
                        : Colors["light"].textAcc1
                    }
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      width:"80%",
                      color: item.active
                        ? Colors["light"].background
                        : Colors["light"].text,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
              {item.pluse && (
                <View style={styles.plusIcon}>
                  <Feather
                    name="plus"
                    size={15}
                    color="#fff"
                    style={{ textAlign: "center" }}
                  />
                </View>
              )}
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
  cardActive: {
    backgroundColor: Colors["light"].primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 90,
    height: 60,
  },
  cardDefault: {
    backgroundColor: Colors["light"].background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors["light"].accent,
    borderWidth: 1,
    borderRadius: 8,
    width: 90,
    height: 60,
  },
  plusIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#48DD7E",
    borderRadius: 8,
    position: "absolute",
    top: 0,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
