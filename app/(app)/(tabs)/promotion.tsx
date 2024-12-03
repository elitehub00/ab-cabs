import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

export default function Promotion() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlashList
          data={[1, 2, 3, 4,6,7,8,9,10,11,12]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              mode="contained"
              theme={{ colors: { surfaceVariant: Colors["light"].background } }}
              style={styles.card}
            >
              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      backgroundColor: "rgba(73, 165, 204, 0.1)",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="ticket-percent"
                      size={24}
                      color="#66b2ff"
                    />
                  </View>
                </View>

                <View style={styles.lineContainer}>
                  <View style={styles.halfCircleBottom} />

                  <View style={styles.dottedLine} />

                  <View style={styles.halfCircle} />
                </View>

                <View style={styles.textContainer}>
                  <Text variant="titleMedium">
                    10% Off the base rate on your next rental
                  </Text>
                  <Text>Valid to 09/25/2019</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Button mode="text" onPress={() => console.log("Use Now")}>
                      Use now
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          )}
          estimatedItemSize={200}
        />
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
  card: {
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: Colors["light"].background,
    marginTop: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },

  lineContainer: {
    alignItems: "center",
  },
  dottedLine: {
    flex: 1,
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    borderStyle: "dotted",
  },
  halfCircle: {
    width: 12,
    height: 6,
    backgroundColor: Colors["light"].secondary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  halfCircleBottom: {
    width: 12,
    height: 6,
    backgroundColor: Colors["light"].secondary,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
