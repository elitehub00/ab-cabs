import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { themes } from "@/constants/Colors";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";
import AnimatedSplashScreen from "@/components/SplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen after fonts and animations load
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 2250);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <PaperProvider theme={themes}>
      {isSplashVisible ? (
        <AnimatedSplashScreen /> // Show animated splash screen
      ) : (
        <Slot />
      )}
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      {/* <StatusBar style="auto" /> */}
    </PaperProvider>
    // </ThemeProvider>
  );
}
