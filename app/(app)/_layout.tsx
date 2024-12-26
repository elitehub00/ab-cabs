import { View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/ctx";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onboarding();
  }, []);

  const onboarding = async () => {
    setLoading(true);
    const onboarded = await AsyncStorage.getItem("onboarded");

    if (onboarded && onboarded === "true") {
      setOnboarded(true);
    }

    setLoading(false);
  };

  if (loading || isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={Colors.light.primary}
        />
      </View>
    );
  }

  if (!onboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(menu)" options={{ headerShown: false }} />
    </Stack>
  );
}
