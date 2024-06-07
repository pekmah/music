import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";

const playlistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Playlists" }}
        />
      </Stack>
    </View>
  );
};
export default playlistScreenLayout;
