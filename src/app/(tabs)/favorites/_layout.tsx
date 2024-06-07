import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";

const FavoritesScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Favorites" }}
        />
      </Stack>
    </View>
  );
};
export default FavoritesScreenLayout;
