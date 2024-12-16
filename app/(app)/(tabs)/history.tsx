import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { StyleSheet, Image, View } from "react-native";
import {
  SegmentedButtons,
  Card,
  Text,
  Button,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function TabTwoScreen() {
  const [value, setValue] = useState("gone");
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          header: () => <CustomHeader title="My Rides" isHome={false} isMenu={false} />,
        }}
      />
      <View style={styles.contentContainer}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          density="regular"
          style={{
            borderWidth: 1,
            borderColor: Colors["light"].primary,
            borderRadius: 25,
            height: 50,
            marginTop: 24,
            padding: 0,
          }}
          theme={{
            colors: {
              secondaryContainer: Colors["light"].primary,
              outline: Colors["light"].primary,
            },
          }}
          buttons={[
            {
              value: "upcoming",
              label: "Upcoming",
              checkedColor: Colors["light"].background,
              uncheckedColor: "#838383",
              style: {
                borderWidth: 0,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              },
            },
            {
              value: "gone",
              label: "Gone",
              checkedColor: Colors["light"].background,
              uncheckedColor: "#838383",
              style: {
                borderWidth: 0,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              },
            },
            {
              value: "cancelled",
              label: "Cancelled",
              checkedColor: Colors["light"].background,
              uncheckedColor: "#838383",
              style: {
                borderWidth: 0,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              },
            },
          ]}
        />
        <View style={{ flex: 1, marginTop: 24 }}>
          <FlashList
            data={[1, 2, 3, 4, 5]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card
                mode="elevated"
                elevation={1}
                contentStyle={{
                  padding: 8,
                  overflow: "hidden",
                }}
                style={{ marginBottom: 16 }}
                theme={{
                  colors: { elevation: { level1: Colors["light"].background } },
                }}
              >
                <Card.Content>
                  <View>
                    <Text>06 Mar 2024, 11:99</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.lineContainer}>
                      <MaterialCommunityIcons
                        name="record-circle"
                        size={28}
                        color={Colors["light"].primary}
                      />
                      <Divider
                        bold
                        horizontalInset
                        theme={{
                          colors: { outlineVariant: Colors["light"].primary },
                        }}
                        style={{ flex: 1, width: 2 }}
                      />
                      {/* <View style={styles.line} /> */}
                      <MaterialCommunityIcons
                        name="record-circle-outline"
                        size={28}
                        color={Colors["light"].primary}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ color: "#838383" }}>
                        Pick-up
                      </Text>
                      <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                        Near RUMF7314, 7314UIH-456343435
                      </Text>
                      <Divider
                        bold
                        theme={{
                          colors: { outlineVariant: Colors["light"].secondary },
                        }}
                        style={{ marginVertical: 4, height: 2, width: "100%" }}
                      />
                      <Text variant="bodyLarge" style={{ color: "#838383" }}>
                        Drop off
                      </Text>
                      <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                        home
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardBottom}>
                    <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                      $7.00
                    </Text>
                    <Text
                      variant="labelLarge"
                      style={{ color: Colors["light"].primary }}
                    >
                      Completed
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            )}
            estimatedItemSize={200}
          />
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
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginVertical: 24,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    flex: 1,
    borderRightColor: Colors["light"].primary,
    borderRightWidth: 2,
  },
  lineContainer: {
    alignItems: "center",
    // justifyContent:"space-around"
  },
});
