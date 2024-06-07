import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";

const ArtistsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Artists" }}
        />
      </Stack>
    </View>
  );
};
export default ArtistsScreenLayout;
