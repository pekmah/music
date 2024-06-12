import { View, ScrollView } from "react-native";
import { defaultStyles } from "@/styles";
import TracksList from "@/components/TracksList";
import { padding } from "@/constants/tokens";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useFavorites } from "@/store/library";
import { trackTitleFilter } from "@/helpers/filter";
import { useMemo } from "react";

const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in favorite songs",
    },
  });

  const favoritesTrack = useFavorites().favorites;

  const filteredFavorites = useMemo(() => {
    if (!search) return favoritesTrack;

    return favoritesTrack.filter(trackTitleFilter(search));
  }, [favoritesTrack, search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: padding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TracksList scrollEnabled={false} tracks={filteredFavorites} />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
