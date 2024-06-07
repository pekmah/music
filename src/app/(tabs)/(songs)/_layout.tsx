import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";

const SongsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Songs" }}
        />
      </Stack>
    </View>
  );
};
export default SongsScreenLayout;
