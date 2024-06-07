import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";

const ArtistsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Artists" }} />
      </Stack>
    </View>
  );
};
export default ArtistsScreenLayout;
