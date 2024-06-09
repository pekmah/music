import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SplashScreen, Stack } from "expo-router";

import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import { useCallback } from "react";
import useLogTrackPlayerState from "@/hooks/useLogTrackPlayerState";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });

  useLogTrackPlayerState();

  return (
    <SafeAreaProvider>
      <RootNavigation />

      {/* sets the status bar based on theme(dark/light) */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;
