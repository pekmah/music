import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/tokens";

const playlistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Playlists" }}
        />
        <Stack.Screen
          name="[name]"
          options={{
            headerTitle: "",
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.primary,
          }}
        />
      </Stack>
    </View>
  );
};
export default playlistScreenLayout;
