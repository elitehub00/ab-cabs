import { View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [onboarded, setOnboarded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onboarding();
  }, []);

  const onboarding = async () => {
    setLoading(true);
    const onboarded = await AsyncStorage.getItem("onboarded");
    const login = await AsyncStorage.getItem("login");

    if (onboarded && onboarded === "true") {
      setOnboarded(true);
    }

    if (login && login === "true") {
      setLoggedIn(true);
    }
    setLoading(false);
  };

  if (loading) {
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

  if (!loggedIn) {
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
