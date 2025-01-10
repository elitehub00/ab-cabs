import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { StyleSheet, Image, View } from "react-native";
import {
  SegmentedButtons,
  Card,
  Text,
  Button,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/ctx";
import { format, parseISO } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

interface Booking {
  id: string;
  from: {
    name: string;
    address: string;
  };
  to: {
    name: string;
    address: string;
  };
  date: string;
  time: string;
  status: string;
  userId: string;
  createdAt: string;
}

export default function TabTwoScreen() {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [value, setValue] = useState("upcoming");
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [value,isFocused]);

  const formatTime = (dateTime: string) => {
    const date = parseISO(dateTime);

    return format(date, "hh:mm a");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("userId", user?.id)
        .eq("status", value);

      if (error) {
        console.log(error);
        setLoading(false);
      } else {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const completeRide = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "gone",
        })
        .eq("id", id);

      if (error) {
        console.log(error);
      } else {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelRide = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "cancelled",
        })
        .eq("id", id);

      if (error) {
        console.log(error);
      } else {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRide = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "saved",
        })
        .eq("id", id);

      if (error) {
        console.log(error);
      } else {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          header: () => (
            <CustomHeader title="My Rides" isHome={false} isMenu={false} />
          ),
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
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors["light"].primary} />
          </View>
        ) : data.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text variant="labelLarge" style={{ color: Colors["light"].text }}>
              No {value} rides found
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1, marginTop: 24 }}>
            <FlashList
              data={data}
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
                    colors: {
                      elevation: { level1: Colors["light"].background },
                    },
                  }}
                >
                  <Card.Content>
                    <View>
                      <Text>
                        {format(item.date, "dd MMM yyyy")},{" "}
                        {formatTime(item.time)}
                      </Text>
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
                        <Text
                          variant="bodyLarge"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.from.name}
                        </Text>
                        <Divider
                          bold
                          theme={{
                            colors: {
                              outlineVariant: Colors["light"].secondary,
                            },
                          }}
                          style={{
                            marginVertical: 4,
                            height: 2,
                            width: "100%",
                          }}
                        />
                        <Text variant="bodyLarge" style={{ color: "#838383" }}>
                          Drop off
                        </Text>
                        <Text
                          variant="bodyLarge"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.to.name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cardBottom}>
                      <Text
                        variant="labelLarge"
                        style={{ fontWeight: "bold", color: "red" }}
                      >
                        {item.status === "upcoming" && " Cancel Ride"}
                      </Text>
                      <Text
                        variant="labelLarge"
                        style={{ color: Colors["light"].primary }}
                      >
                        {item.status === "upcoming" ? "Completed" : "Save"}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              )}
              estimatedItemSize={200}
            />
          </View>
        )}
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
