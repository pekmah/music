import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";

const playlistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Playlists" }} />
      </Stack>
    </View>
  );
};
export default playlistScreenLayout;
