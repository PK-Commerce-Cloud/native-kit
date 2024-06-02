require("node-libs-expo/globals");

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { syncObservable, configureObservableSync } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { auth$ } from "@/lib/store/auth";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import CommerceProvider from "@/lib/providers/commcer-provider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

enableReactComponents();

// Setup global persist configuration
configureObservableSync({
  persist: {
    plugin: ObservablePersistMMKV,
  },
});

export default function RootLayout() {
  syncObservable(auth$, {
    persist: {
      name: "auth",
    },
  });

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <CommerceProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </CommerceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
