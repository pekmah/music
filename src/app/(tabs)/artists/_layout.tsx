import { Stack } from "expo-router";
import { View } from "react-native";

import { defaultStyles } from "@/styles";
import { stackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/tokens";

const ArtistsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...stackScreenWithSearchBar, headerTitle: "Artists" }}
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
export default ArtistsScreenLayout;
