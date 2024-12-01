import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { Text, Card } from "react-native-paper";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CustomHeader } from "@/components/ui/CustomHeader";

export default function HomeScreen() {
  return (
    <>
      <Tabs.Screen
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <View style={[styles.container]}>
        <Card
          mode="contained"
          contentStyle={{ paddingVertical: 12,paddingHorizontal:0}}
          theme={{ colors: { surfaceVariant: Colors["light"].background } , roundness: 4 }}
        >
          <Card.Title title="Book A Ride Now" titleStyle={{ fontSize: 16, fontWeight: "700" }} />
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
});
