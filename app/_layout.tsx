import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { themes } from "@/constants/Colors";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import AnimatedSplashScreen from "@/components/SplashScreen";
import { SessionProvider } from "@/context/ctx";
import 'react-native-get-random-values'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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
    <SafeAreaProvider>
      <SessionProvider>
        <PaperProvider theme={themes}>
          {isSplashVisible ? (
            <AnimatedSplashScreen />
          ) : (
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
              <Slot />
            </SafeAreaView>
          )}
        </PaperProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
