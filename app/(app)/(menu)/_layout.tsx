import { Stack } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: Colors["light"].primary,
    //     },
    //     headerTintColor: Colors["light"].background,
    //     headerTitleStyle: {

    //     },

    //   }}
    >
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
    </Stack>
  );
}
