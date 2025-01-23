import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  Portal,
  Dialog,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Tabs } from "expo-router";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { SIZES } from "@/constants/Sizes";
import { useAuth } from "@/context/ctx";
import { supabase } from "@/lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { set } from "date-fns";

interface User {
  id: string;
  full_name: string;
  mobile: string;
  email: string;
  avatar_url?: string;
}

interface UserPromotion {
  id: number;
  userId: User;
}

interface Promotion {
  id: number;
  name: string;
  valid: string;
  userPromotion: UserPromotion[];
}

export default function Promotion() {
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPromotions();
  }, [isFocused]);

  const showDialog = (promtion: Promotion) => {
    setVisible(true);
    setSelectedPromotion(promtion);
  };

  const hideDialog = () => setVisible(false);

  function formatDateToMMDDYYYY(dateString: string) {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  }

  const fetchPromotions = async () => {
    const date = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("promotion")
      .select(`*,userPromotion(userId(*))`)
      .gte("valid", date)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setPromotions(data);
      setLoading(false);
    }
  };

  const usePromtion = async () => {
    if (selectedPromotion) {
      setSendLoading(true);
      const { error } = await supabase.from("userPromotion").insert({
        userId: user?.id,
        promotionId: selectedPromotion.id,
      });
      if (error) {
        console.log(error);
        setSendLoading(false);
      } else {
        setSelectedPromotion(undefined);
        setVisible(false);
        fetchPromotions();
        setSendLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          header: () => (
            <CustomHeader title="Promotions" isHome={false} isMenu={false} />
          ),
        }}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors["light"].primary} />
        </View>
      ) : promotions.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="labelLarge" style={{ color: Colors["light"].text }}>
            promotions will be available soon..
          </Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <FlashList
            data={promotions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card
                mode="contained"
                theme={{
                  colors: { surfaceVariant: Colors["light"].background },
                }}
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
                    <Text variant="titleMedium">{item.name}</Text>
                    <Text>Valid to {formatDateToMMDDYYYY(item.valid)}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      {item.userPromotion[0]?.userId.id === user?.id ? (
                        <Text
                          variant="labelLarge"
                          style={{ fontWeight: "bold", color: "orange",padding:10 }}
                        >
                          Used
                        </Text>
                      ) : (
                        <Button mode="text" onPress={() => showDialog(item)}>
                          Use now
                        </Button>
                      )}
                    </View>
                  </View>
                </View>
              </Card>
            )}
            estimatedItemSize={200}
          />
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              theme={{
                colors: { elevation: { level3: Colors["light"].background } },
              }}
            >
              <Dialog.Title>Use Promotion</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure you want to use this promotion?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={usePromtion}>Use</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
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
    marginHorizontal: SIZES.width * 0.05,
  },
  card: {
    borderRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: Colors["light"].background,
    marginTop: SIZES.width * 0.04,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    padding: SIZES.width * 0.04,
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
