import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";

const FavoritesScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Favorites" }} />
      </Stack>
    </View>
  );
};
export default FavoritesScreenLayout;
