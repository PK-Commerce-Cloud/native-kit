require("node-libs-expo/globals");
import CommerceProvider from "@/lib/providers/commcer-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";
import { tamaguiConfig } from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme?.toString()}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={new QueryClient()}>
          <CommerceProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: "Home",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="product/[id]"
                options={{
                  title: "Product Details",
                }}
              />

              <Stack.Screen
                name="category/[id]"
                options={{
                  title: "Category Details",
                }}
              />
            </Stack>
          </CommerceProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
